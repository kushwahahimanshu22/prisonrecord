const Prisoner = require('../model/prisonerModel');

exports.getPrisoners = async (req, res, next) => {
  try {
    const prisoners = await Prisoner.findAll();
    res.status(200).json({
      status: 'success',
      data: prisoners,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getPrisonerById = async (req, res, next) => {
  try {
    const prisoner = await Prisoner.findOne(req.params.id);
    if (prisoner.length === 0) {
      res.status(404).json({
        status: 'failed',
        message: `Prisoner with id ${req.params.id} does not exist`,
      });
      return next();
    }
    res.status(200).json({
      status: 'success',
      data: prisoner,
    });
  } catch (err) {
    console.log(err);
  }
};

exports.createPrisoner = async (req, res, next) => {
  try {
    const prisoner = new Prisoner(req.body);
    await prisoner.save(req.body);
    res.status(201).json({
      status: 'success',
      data: prisoner,
    });
    next();
  } catch (err) {
    console.log(err);
  }
};

exports.updatePrisoner = async (req, res, next) => {
  const prisoner = await Prisoner.findOne(req.body.prisoner_id);
  const updatePrisoner = new Prisoner(prisoner[0]);

  if (req.body.prison_id) updatePrisoner.prison_id = req.body.prison_id;
  if (req.body.prisoner_name)
    updatePrisoner.prisoner_name = req.body.prisoner_name;
  if (req.body.case_id) updatePrisoner.case_id = req.body.case_id;
  if (req.body.date_in) updatePrisoner.date_in = req.body.date_in;
  if (req.body.date_out) updatePrisoner.date_out = req.body.date_out;
  if (req.body.age) updatePrisoner.age = req.body.age;
  if (req.body.address) updatePrisoner.address = req.body.address;
  if (req.body.ward_id) updatePrisoner.ward_id = req.body.ward_id;

  updatePrisoner.update();
  res.status(204).json({
    status: 'success',
    data: prisoner,
  });
};
