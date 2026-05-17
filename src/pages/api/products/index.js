import db from '../../../db/models';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const products = await db.Product.findAll({
        include: [{ model: db.Seller, as: 'seller' }],
        order: [['createdAt', 'DESC']],
      });
      return res.status(200).json(products);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'POST') {
    try {
      const product = await db.Product.create(req.body);
      const full = await db.Product.findByPk(product.id, {
        include: [{ model: db.Seller, as: 'seller' }],
      });
      return res.status(201).json(full);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
