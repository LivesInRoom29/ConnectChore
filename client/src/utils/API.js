/* eslint-disable import/no-anonymous-default-export */
// api calls get/get, add/post, delete/put

import Axios from "axios"

export default {
    
    // REWARD DESCRIPTION CALLS - /api/reward-descriptions/
    // get reward descriptions by logged in user
    getRewardDescriptions: function(userid) {
        return Axios.get(`/api/reward-descriptions/user/${userid}`);
    },
    // add a reward description
    addRewardDescription: function(rewardData) {
        return Axios.post(`/api/reward-descriptions/`, rewardData);
    },
    // soft-delete reward description
    deleteRewardDescription: function(rewardDescriptionId, rewardData) {
        return Axios.put(`/api/reward-descriptions/${rewardDescriptionId}`, rewardData);
    },

    
    // HOUSEHOLD MEMBER CALLS - matches /api/household-members/
    // get a list of household members for logged in user
    getHouseholdMembers: function(userid) {
        return Axios.get(`api/household-members/user/${userid}`);
    },
    // add household member
    addHouseholdMember: function(houseHoldMemberData) {
        return Axios.post(`/api/household-members/`, houseHoldMemberData);
    },
    // soft-delete household member
    deleteHouseholdMember: function(houseHoldMemberId, houseHoldMemberData) {
        return Axios.put(`/api/household-members/${houseHoldMemberId}`, houseHoldMemberData);
    },

    // NOT TESTED YET
    // CHORELIST CALLS - /api/household-members/
    // get chores for a one household member
    getChoreListForHouseholdMember: function(householdMemberId, choreListDate) {
        return Axios.get(`api/chorelist/${householdMemberId}/${choreListDate}`);
    },
    // add a chorelist
    addChoreList: function(choreListData) {
        return Axios.post(`api/household-members`, choreListData);
    }
    

    // Rewards calls - /api/rewards/
}