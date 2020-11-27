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
        return Axios.get(`/api/household-members/user/${userid}`);
    },
    // add household member
    addHouseholdMember: function(houseHoldMemberData) {
        return Axios.post(`/api/household-members/`, houseHoldMemberData);
    },
    // soft-delete household member
    deleteHouseholdMember: function(houseHoldMemberId, houseHoldMemberData) {
        return Axios.put(`/api/household-members/${houseHoldMemberId}`, houseHoldMemberData);
    },

    // NOT TESTED YET -- most are now.
    // CHORELIST CALLS - /api/chore-lists
    // get Chore List details by choreListId -- ADD THIS TO CONTROLLER
    getChoreLists: function(userid) {
        return Axios.get(`/api/chore-lists/user/${userid}`);
    },
    // get chores for a one household member
    getChoreListForHouseholdMember: function(householdMemberId, choreListDate) {
        return Axios.get(`/api/chore-lists/${householdMemberId}/${choreListDate}`);
    },
    // get chorelist populated with tasks
    getChoreListWithTasks: function(choreListId) {
        return Axios.get(`/api/chore-lists/withtasks/${choreListId}`);
    },
    // add a chorelist
    addChoreList: function(choreListData) {
        return Axios.post(`/api/chore-lists/`, choreListData);
    },
    deleteChoreList: function(choreListId, choreListData) {
        return Axios.put(`/api/chore-lists/${choreListId}`, choreListData);
    },
    // add tasks to chorelist
    addTaskToChoreList: function(choreListId, taskId) {
        return Axios.put(`/api/chore-lists/tasks/${choreListId}`, {task: taskId});
    },
    //change completion status of a task in the chorelist
    updateTaskCompletion: function(taskId, completionStatus) {
        return Axios.put(`/api/chore-lists/completetask/${taskId}`, {completionStatus: completionStatus});
    },
    // delete a task from the tasks array in the chorelist
    deleteTaskFromChoreList: function(choreListId, taskId) {
        return Axios.put(`/api/chore-lists/deletetask/${choreListId}`, {taskId: taskId})
    },

    // TASK CALLS - /api/tasks
    // get tasks
    getTasks: function(userid) {
        return Axios.get(`/api/tasks/user/${userid}`);
    },

    // add tasks - /api/tasks/
    addTask: function(taskData) {
        return Axios.post(`/api/tasks/`, taskData);
    },
    deleteTask: function(taskId, taskData) {
        return Axios.post(`/api/tasks/${taskId}`, taskData);
    }



    // Rewards calls - /api/rewards/
}