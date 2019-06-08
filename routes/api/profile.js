const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Profile = require('../../models/Profile');
const Experience = require('../../models/Experience');
const Education = require('../../models/Education');
const Skill = require('../../models/Skill');


//////////////////////////////////////////     PROFILE      ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  GET api/profile/me
 * @description Get current users profile
 * @access   Private
 */

router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: { userId: req.user.id },
      attribiuts: ['name', 'avatar']
    });
    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    return res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  POST api/profile
 * @description Create user profile
 * @access   Private
 */

router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required')
        .not()
        .isEmpty(),
      check('skills', 'Skills is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      website,
      location,
      bio,
      status,
      githubusername,
      skills,
      youtube,
      facebook,
      twitter,
      instagram,
      linkedin
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.userId = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (youtube) profileFields.youtube = youtube;
    if (twitter) profileFields.twitter = twitter;
    if (facebook) profileFields.facebook = facebook;
    if (linkedin) profileFields.linkedin = linkedin;
    if (instagram) profileFields.instagram = instagram;

    let allSkills = [];
    if (skills) {
      allSkills = skills.split(',').map(skill => skill.trim());
    }

    try {
      let profile = await Profile.findOne({ where: { userId: req.user.id } });
      if (profile) {
        return res.json({ msg: 'You have profile already' });
      } else {
        NewProfile = await Profile.create(profileFields);
        await NewProfile.save();
        res.json(NewProfile);
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  GET api/profile/
 * @description Get all profiles
 * @access   Public
 */

router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.findAll();
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  GET api/profile/user/:user_id
 * @description Get profile by user ID
 * @access   Public
 */

router.get('/user/:id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: { userId: req.params.id }
    });
    if (!profile) return res.status(400).json({ msg: 'Profile not found' });
    res.json(profile);
  } catch (err) {
    res.status(500).send(`Server Error: ${err.message}`);
  }
});

/**
 * @version 2.1.1
 * @author Samyar Modabber
 * @route  DELETE api/profile
 * @description Delete profile
 * @access   Private
 */

router.delete('/', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      where: { userId: req.user.id }
    });
    await profile.destroy().then(deletedProfile => {
      res.json({ msg: `User with User ID ${deletedProfile.userId} deleted` });
    });
  } catch (err) {
    res.status(500).send(`Server Error: ${err.message}`);
  }
});


//////////////////////////////////////////     EXPERIENCE      /////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  POST api/profile/experience
 * @description Add profile experience
 * @access   Private
 */
router.post(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required')
        .not()
        .isEmpty(),
      check('company', 'Company is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let { title, company, location, from, to, current, description } = req.body;
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      res.status(400).json({ msg: 'You have to make a profile first!' });
    }
    let profileId = profile.id;
    let newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
      profileId
    };

    try {
      newExperience = await Experience.create(newExp);
      await newExperience.save();
      res.json(newExperience);
    } catch (err) {
      res.status(500).send(`Server Error: ${err.message}`);
    }
  }
);

/**
 * @version NOT test
 * @author Samyar Modabber
 * @route  UPDATE api/profile/experience/:expId
 * @description UPDATE an Experience
 * @access   Private
 */
router.put('/Experience/:expId', [
  auth,
  [
    check('title', 'Title is required')
      .not()
      .isEmpty(),
    check('company', 'Company is required')
      .not()
      .isEmpty(),
    check('from', 'From date is required')
      .not()
      .isEmpty()
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Find profile of user
    const userId = req.user.id;
    const profile = await Profile.findOne({ where: { userId } });
    if (!profile) {
      res.status(400).json({ msg: 'You have to make a profile first!' });
    }
    if (profile.userId !== userId) {
      res.status(400).send({ msg: 'You can not update other experience' });
    }

    // Find Experience
    const id = req.params.expId;
    const exp = await Experience.findOne({
      where: { id }
    });
    if (!exp) {
      res.status(400).send({ msg: `There is not Experience with id ${id}` });
    }
    await exp.update(req.body).then(updatedExperience => {
      res.json({ msg: `Experience with ID ${updatedExperience.id} updated` });
    });
  } catch (err) {
    res.status(500).send(`Server Error: ${err.message}`);
  }
});

/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  DELETE api/profile/experience/:expId
 * @description Delete an experience
 * @access   Private
 */
router.delete('/experience/:expId', auth, async (req, res) => {
  try {
    // Find profile of user
    const userId = req.user.id;
    const profile = await Profile.findOne({ where: { userId } });
    if (profile.userId !== userId) {
      res.status(400).send({ msg: 'You can not delete other Education' });
    }
    // Find Experience
    const experience = await Experience.findOne({
      where: { id: req.params.expId }
    });
    // Delete Proccess
    if (!experience) {
      res
        .status(400)
        .send({ msg: `There is not experience with id ${req.params.expId}` });
    }
    await experience.destroy().then(deletedExperience => {
      res.json({ msg: `Experience with ID ${deletedExperience.id} deleted` });
    });
  } catch (err) {
    res.status(500).send(`Server Error: ${err.message}`);
  }
});

/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  GET api/profile/:profileId/experience
 * @description Get all experiences
 * @access   Public
 */
router.get('/:profileId/experience', async (req, res) => {
  try {
    let { profileId } = req.params;
    const experiences = await Experience.findAll({
      where: { profileId }
    });
    if (experiences.length === 0) {
      res.status(400).send({
        msg: `There is not experience for profile with iD ${profileId}`
      });
    }
    res.json(experiences);
  } catch (err) {
    res.status(500).send(`Server Error: ${err.message}`);
  }
});

//////////////////////////////////////////     EDUCATION      //////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  Post api/profile/experience/:expId
 * @description Create an Education
 * @access   Private
 */
router.post(
  '/education',
  [
    auth,
    [
      check('school', 'School is required')
        .not()
        .isEmpty(),
      check('degree', 'Degree is required')
        .not()
        .isEmpty(),
      check('fieldofstudy', 'Field of study is required')
        .not()
        .isEmpty(),
      check('from', 'From date is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description
    } = req.body;
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      res.status(400).json({ msg: 'You have to make a profile first!' });
    }
    let profileId = profile.id;
    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
      profileId
    };

    try {
      newEducation = await Education.create(newEdu);
      await newEducation.save();
      res.json(newEducation);
    } catch (err) {
      res.status(500).send(`Server Error: ${err.message}`);
    }
  }
);


/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  GET api/profile/:profileId/Education
 * @description Get all Educations
 * @access   Public
 */
router.get('/:profileId/education', async (req, res) => {
  try {
    let { profileId } = req.params;
    const educations = await Education.findAll({
      where: { profileId }
    });
    if (educations.length === 0) {
      res.status(400).send({
        msg: `There is not education for profile with iD ${profileId}`
      });
    }
    res.json(educations);
  } catch (err) {
    res.status(500).send(`Server Error: ${err.message}`);
  }
});


/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  UPDATE api/profile/education/:eduId
 * @description UPDATE an Education
 * @access   Private
 */
router.put('/education/:eduId', [
  auth,
  [
    check('school', 'School is required')
      .not()
      .isEmpty(),
    check('degree', 'Degree is required')
      .not()
      .isEmpty(),
    check('fieldofstudy', 'Field of study is required')
      .not()
      .isEmpty(),
    check('from', 'From date is required')
      .not()
      .isEmpty()
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Find profile of user
    const userId = req.user.id;
    const profile = await Profile.findOne({ where: { userId } });
    if (!profile) {
      res.status(400).json({ msg: 'You have to make a profile first!' });
    }
    if (profile.userId !== userId) {
      res.status(400).send({ msg: 'You can not update other education' });
    }

    // Find education
    const id = req.params.eduId;
    const edu = await Education.findOne({
      where: { id }
    });
    if (!edu) {
      res.status(400).send({ msg: `There is not education with id ${id}` });
    }
    await edu.update(req.body).then(updatedEducation => {
      res.json({ msg: `Education with ID ${updatedEducation.id} updated` });
    });
  } catch (err) {
    res.status(500).send(`Server Error: ${err.message}`);
  }
});
/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  DELETE api/profile/Education/:expId
 * @description Delete an Education
 * @access   Private
 */
router.delete('/education/:eduId', auth, async (req, res) => {
  try {
    // Find profile of user
    const userId = req.user.id;
    const profile = await Profile.findOne({ where: { userId } });
    if (profile.userId !== userId) {
      res.status(400).send({ msg: 'You can not delete other Education' });
    }
    // Find Education
    const education = await Education.findOne({
      where: { id: req.params.eduId }
    });
    if (!education) {
      res
        .status(400)
        .send({ msg: `There is not education with id ${req.params.eduId}` });
    }
    await education.destroy().then(deletededucation => {
      res.json({ msg: `Education with ID ${deletededucation.id} deleted` });
    });
  } catch (err) {
    res.status(500).send(`Server Error: ${err.message}`);
  }
});


//////////////////////////////////////////     SKILLS       ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  Post api/profile/skill
 * @description Create a Skill
 * @access   Private
 */
router.post(
  '/skill',
  [
    auth,
    [
      check('title', 'title is required')
        .not()
        .isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title } = req.body;
    const profile = await Profile.findOne({ user: req.user.id });
    if (!profile) {
      res.status(400).json({ msg: 'You have to make a profile first!' });
    }
    const profileId = profile.id;
    const newSkill = {
      title,
      profileId
    };

    try {
      skill = await Skill.create(newSkill);
      await skill.save();
      res.json(skill);
    } catch (err) {
      res.status(500).send(`Server Error: ${err.message}`);
    }
  }
);

/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  GET api/profile/:profileId/Skill
 * @description Get all Skills
 * @access   Public
 */
router.get('/:profileId/skill', async (req, res) => {
  const { profileId } = req.params;
  try {
    skills = await Skill.findAll({
      where: { profileId }
    });
    if (skills.length === 0) {
      res.status(400).send({
        msg: `There is not skill for profile with iD ${profileId}`
      });
    }
    res.json(skills);
  } catch (err) {
    res.status(500).send(`Server Error: ${err.message}`);
  }
});

/**
 * @version 2.1.0
 * @author Samyar Modabber
 * @route  UPDATE api/profile/Skill/:skillId
 * @description UPDATE an Skill
 * @access   Private
 */
router.put('/skill/:skillId', [
  auth,
  [
    check('title', 'title is required')
      .not()
      .isEmpty()
  ]
], async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // Find profile of user
    const userId = req.user.id;
    const profile = await Profile.findOne({ where: { userId } });
    if (!profile) {
      res.status(400).json({ msg: 'You have to make a profile first!' });
    }
    if (profile.userId !== userId) {
      res.status(400).send({ msg: 'You can not update other skill' });
    }

    // Find Skill
    const id = req.params.skillId;
    const skill = await Skill.findOne({
      where: { id }
    });
    if (!skill) {
      res.status(400).send({ msg: `There is not skill with id ${id}` });
    }
    await skill.update(req.body).then(updatedSkill => {
      res.json({ msg: `skill with ID ${updatedSkill.id} updated` });
    });
  } catch (err) {
    res.status(500).send(`Server Error: ${err.message}`);
  }
});

/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  DELETE api/profile/Skill/:skillId
 * @description Delete an Skill
 * @access   Private
 */
router.delete('/skill/:skillId', auth, async (req, res) => {
  try {
    // Find profile of user
    const userId = req.user.id;
    const profile = await Profile.findOne({ where: { userId } });
    if (profile.userId !== userId) {
      res.status(400).send({ msg: 'You can not delete other skill' });
    }

    // Find Skill
    const id = req.params.skillId;
    const skill = await Skill.findOne({
      where: { id }
    });
    if (!skill) {
      res.status(400).send({ msg: `There is not skill with id ${id}` });
    }
    await skill.destroy().then(deletedskill => {
      res.json({ msg: `skill with ID ${deletedskill.id} deleted` });
    });
  } catch (err) {
    res.status(500).send(`Server Error: ${err.message}`);
  }
});


//////////////////////////////////////////     GITHUB      ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
/**
 * @version 2.0.0
 * @author Samyar Modabber
 * @route  GET api/profile/github/:username
 * @description Get user repos from Github
 * @access   Public
 */

router.get('/github/:username', (req, res) => {
  try {
    const options = {
      uri: `https://api.github.com/users/${
        req.params.username
      }/repos?per_page=5&sort=created:asc&client_id=${config.get(
        'githubClientId'
      )}&client_secret=${config.get('githubSecret')}`,
      method: 'GET',
      headers: { 'user-agent': 'node.js' }
    };

    request(options, (error, response, body) => {
      if (error) console.error(error);
      if (response.statusCode !== 200) {
        return res.status(404).json({ msg: 'No Github profile found' });
      }
      res.json(JSON.parse(body));
    });
  } catch (err) {
    res.status(500).send(`Server Error: ${err.message}`);
  }
});

module.exports = router;
