import { setUser } from "./userRedux";

export const getUser = async (dispatch, lixtagram, accAdr) => {
  try {
    const userDetails = await lixtagram.methods.getUserDetails(accAdr).call()
    const folCount = await lixtagram.methods.getFollowedAndFollowersCount(accAdr).call()
    const currUser = {
      name: userDetails[0],
      tokens: userDetails[1],
      postsCount: userDetails[2],
      redeemTokens: userDetails[3],
      uadd: userDetails[4],
      followerCount: folCount[0],
      followingCount: folCount[1],
    }
    dispatch(setUser(currUser))
  } catch (err) {
    console.log(err.message)
  }
};
