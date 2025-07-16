const Notification = require('../models/notification');

exports.createNotification = async (req, res) => {
  try {
    const item = await Notification.create(req.body);
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllNotifications = async (req, res) => {
  try {
    const items = await Notification.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNotificationById = async (req, res) => {
  try {
    const item = await Notification.findById(req.params.id);
    if (!item) return res.status(404).json({ message: "Notification non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateNotification = async (req, res) => {
  try {
    const item = await Notification.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!item) return res.status(404).json({ message: "Notification non trouvé" });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteNotification = async (req, res) => {
  try {
    const item = await Notification.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ message: "Notification non trouvé" });
    res.json({ message: "Notification supprimé" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
