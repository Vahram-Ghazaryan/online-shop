import db from '../../../db/models';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const sellers = await db.Seller.findAll({
        order: [['createdAt', 'DESC']],
      });
      return res.status(200).json(sellers);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const seller = await db.Seller.create(req.body);
      return res.status(201).json(seller);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
