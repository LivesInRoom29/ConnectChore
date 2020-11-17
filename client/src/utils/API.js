/* eslint-disable import/no-anonymous-default-export */
// api call to get rewards
// addRewardDescription

import Axios from "axios"

export default {
    // Reward Calls
    getRewardDescriptions: function(userid) {
        return Axios.get(`/api/rewards/${userid}`);
    },
    addRewardDescription: function(rewardData) {
        return Axios.post(`/api/rewards/`, rewardData);
    },
    // we are not hard-deleting, how do we set the date?
    deleteRewardDescription: function(rewardDescriptionId, rewardData) {
        return Axios.put(`/api/rewards/${rewardDescriptionId}`, rewardData);
    }

    // Chore Calls

    // Household Member calls
}