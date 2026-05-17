import db from '../../../db/models';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const product = await db.Product.findByPk(id, {
        include: [{ model: db.Seller, as: 'seller' }],
      });
      if (!product) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(product);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const product = await db.Product.findByPk(id);
      if (!product) return res.status(404).json({ error: 'Not found' });
      await product.update(req.body);
      const updated = await db.Product.findByPk(id, {
        include: [{ model: db.Seller, as: 'seller' }],
      });
      return res.status(200).json(updated);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const product = await db.Product.findByPk(id);
      if (!product) return res.status(404).json({ error: 'Not found' });
      await product.destroy();
      return res.status(200).json({ message: 'Deleted' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
