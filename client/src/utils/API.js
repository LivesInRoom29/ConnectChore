/* eslint-disable import/no-anonymous-default-export */
// api call to get rewards
// addRewardDescription

import Axios from "axios"

export default {
    // Reward Calls
    getRewardDescriptions: function(userid) {
        return Axios.get(`/api/reward-descriptions/user/${userid}`);
    },
    addRewardDescription: function(rewardData) {
        return Axios.post(`/api/reward-descriptions/`, rewardData);
    },
    // we are not hard-deleting, how do we set the date?
    deleteRewardDescription: function(rewardDescriptionId, rewardData) {
        return Axios.put(`/api/reward-descriptions/${rewardDescriptionId}`, rewardData);
    }

    // Chore Calls

    // Household Member calls
}