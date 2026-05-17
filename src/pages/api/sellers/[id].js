import db from '../../../db/models';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const seller = await db.Seller.findByPk(id);
      if (!seller) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(seller);
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  if (req.method === 'PUT') {
    try {
      const seller = await db.Seller.findByPk(id);
      if (!seller) return res.status(404).json({ error: 'Not found' });
      await seller.update(req.body);
      return res.status(200).json(seller);
    } catch (error) {
      return res.status(400).json({ error: error.message });
    }
  }

  if (req.method === 'DELETE') {
    try {
      const seller = await db.Seller.findByPk(id);
      if (!seller) return res.status(404).json({ error: 'Not found' });
      await seller.destroy();
      return res.status(200).json({ message: 'Deleted' });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}
