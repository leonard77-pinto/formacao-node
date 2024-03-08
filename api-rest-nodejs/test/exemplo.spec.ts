import {afterAll, beforeAll, beforeEach, expect, test } from 'vitest';
import request from 'supertest';
import { app } from '../src/app';
import { execSync } from 'child_process';

beforeEach(()=>{
    execSync('npm run knex migrate:rollback -all')
    execSync('npm run knex migrate:latest')
})

beforeAll(async ()=>{
    await app.ready()
})

afterAll(async ()=>{
    await app.close()
})

test('create transaction', async ()=>{
    const r =  await request(app.server)
        .post('/transactions')
        .send({
            title: 'teste 1',
            amount: 200,
            type: 'credit'
        })
    
    expect(r.statusCode).toEqual(201)
})

test('list transactions', async ()=>{
    const r =  await request(app.server)
        .post('/transactions')
        .send({
            title: 'teste 1',
            amount: 200,
            type: 'credit'
        })
    
    const l = await request(app.server)
        .get('/transactions')
        .set('Cookie', r.get('Set-Cookie'))
        .expect(200)

    expect(l.body.ret).toEqual([
        expect.objectContaining({
            title: 'teste 1',
            amount: 200,
        })
    ])
    //console.log(r.get('Set-Cookie'))
    //expect(r.statusCode).toEqual(201)
})