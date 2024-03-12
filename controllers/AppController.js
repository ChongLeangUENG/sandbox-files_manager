import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  static async getStatus(req, res) {
    const redisAlive = redisClient.isAlive();
    const dbAlive = await dbClient.isAlive();

    res.status(200).json({
      redis: redisAlive,
      db: dbAlive,
    });
  }

  static async getStats(req, res) {
    const usersCount = await dbClient.countDocuments('users');
    const filesCount = await dbClient.countDocuments('files');

    res.status(200).json({
      users: usersCount,
      files: filesCount,
    });
  }
}

export default AppController;
