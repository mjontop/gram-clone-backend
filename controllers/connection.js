const Connection = require("../models/Connections");
const User = require("../models/User");

async function getUsernameFromEmail(emailList) {
  let allUsernames = await User.find(
    { email: { $in: emailList } },
    { username: 1, _id: 0 }
  );
  allUsernames = allUsernames.map((follower) => follower.username);
  return allUsernames;
}

async function getEmailFromUsername(username) {
  const { email } = await User.findOne({ username }, { email: 1, _id: 0 });
  return email;
}

exports.getAllFollowers = async (req, res) => {
  try {
    let followers = await Connection.find({
      followee: req.body.email,
    });
    if (!followers) {
      return res.status(200).json({
        error: false,
        followers: [],
      });
    }
    followers = followers.map((follower) => follower.follower);
    followers = await getUsernameFromEmail(followers);
    return res.status(200).json({
      error: false,
      followers,
    });
  } catch (ex) {
    return res.status(500).json({
      error: true,
      followers: [],
      message: "Error in getting Followers " + ex,
    });
  }
};

exports.getAllFollowees = async (req, res) => {
  try {
    let followees = await Connection.find({
      follower: req.body.email,
    });
    if (!followees) {
      return res.status(200).json({
        error: false,
        followees: [],
      });
    }
    followees = followees.map((followee) => followee.followee);
    followees = await getUsernameFromEmail(followees);
    return res.status(200).json({
      error: false,
      followees,
    });
  } catch (ex) {
    return res.status(500).json({
      error: true,
      followee: [],
      message: "Error in getting Followees " + ex,
    });
  }
};

const followAnotherGuy = async (req, res) => {
  try {
    const connectRow = new Connection({
      follower: req.user.email,
      followee: req.body.email,
    });

    await connectRow.save();
    return {
      error: false,
      message: "Followed",
    };
  } catch (ex) {
    return {
      error: true,
      exception: true,
    };
  }
};

const unFollowAnotherGuy = async (req, res) => {
  try {
    const deletedConnectRow = await Connection.findOneAndDelete({
      follower: req.user.email,
      followee: req.body.email,
    });

    if (deletedConnectRow) {
      return {
        error: false,
        message: "Unfollowed",
      };
    }
    return {
      error: true,
      message: "Does not Exists",
    };
  } catch (ex) {
    return {
      error: true,
      exception: true,
      message: "Exceptions" + ex,
    };
  }
};

const checkIfEmailExists = async (email) => {
  const user = await User.findOne({
    email: email,
  });
  return !!user;
};

exports.toggleFollowers = async (req, res) => {
  try {
    req.body.email = await getEmailFromUsername(req.body.username);
    if (req.body.email === req.user.email) {
      return res.status(400).json({
        error: true,
        message: "Cannot Follow Yourself",
      });
    }
    const isEmailFake = await checkIfEmailExists(req.body.email);
    if (!isEmailFake) {
      return res.status(404).json({
        error: true,
        message: "Email Not Found",
      });
    }
    const { error, message, exception } = await unFollowAnotherGuy(req, res);
    if (!error) {
      return res.status(200).json({
        error,
        message,
      });
    }
    if (error && !!exception) {
      return res.status(400).json({
        error,
      });
    }
    const { error: errorFollow, message: messageFollow } =
      await followAnotherGuy(req, res);
    if (!errorFollow) {
      return res.status(200).json({
        error: errorFollow,
        message: messageFollow,
      });
    }

    return res.status(400).json({
      error,
    });
  } catch (ex) {
    return res.status(500).json({
      error: true,
      message: "Internal Server Error",
    });
  }
};

exports.getAllConnectionsCount = async (req, res) => {
  try {
    let followersCount = await Connection.countDocuments({
      followee: req.body.email,
    });
    let followeesCount = await Connection.countDocuments({
      follower: req.body.email,
    });
    return res.status(200).json({
      error: false,
      followers: followersCount,
      following: followeesCount,
    });
  } catch (ex) {
    return res.status(500).json({
      error: true,
      followers: 0,
      following: 0,
      message: "Error in getting Followers " + ex,
    });
  }
};
