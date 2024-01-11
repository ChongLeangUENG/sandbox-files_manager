const { rejects } = require('assert');
const { resolve } = require('path');
const redis = require('redis');
const { resourceLimits } = require('worker_threads');

class RedisClient {
    constructor() {
        this.client = redis.createClient();
        this.client.on('error', (err) => console.error('Redis client error', err));
    }

    isAlive() {
        return this.client.connected;
    }

    async get(key) {
        return new Promise((resolve, reject) => {
            this.client.get(key, (err, reply) => {
                if (err) reject(err);
                else resolve(reply);
            });
        });
    }

    async set(key, value, duration) {
        return new Promise((resolve, reject) => {
            this.client.set(key, (err, reply) => {
                if (err) reject(err);
                else resolve(reply);
            });
        });
    }

    async del(key) {
        return new Promise((resolve, reject) => {
            this.client.del(key, (err, reply) => {
                if (err) reject(err);
                else resolve(reply);
            });
        });
    }
}

const redisClient = new RedisClient();
module.exports = redisClient;
