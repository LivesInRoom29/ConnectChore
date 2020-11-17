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
    deleteRewardDescription: function(rewardDescriptionId) {
        return Axios.delete(`/api/rewards/${rewardDescriptionId}`);
    }

    // Chore Calls

    // Household Member calls
}