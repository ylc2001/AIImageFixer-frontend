const API = {
    //图片
    "pictures_upload": {
        "path": "/pictures/pictures_upload",
        "method": "post"
    },
    "pictures_search": {
        "path": "/pictures/pictures_search",
        "method": "get"
    },
    "pictures_delete": {
        "path": "/pictures/pictures_delete",
        "method": "post"
    },
    "pictures_repair": {
        "path": "/pictures/pictures_repair",
        "method": "post"
    },
    "repairstep_delete": {
        "path": "/pictures/repairstep_delete",
        "method": "post"
    },
    "picture_search": {
        "path": "/pictures/picture_search",
        "method": "get"
    },
    "picture_modify": {
        "path": "/pictures/picture_modify",
        "method": "post"
    },
    "pictures_release": {
        "path": "/pictures/pictures_release",
        "method": "post"
    },
    //展览
    "exhibit_add": {
        "path": "/exhibits/exhibit_add",
        "method": "post"
    },
    "exhibit_delete": {
        "path": "/exhibits/exhibit_delete",
        "method": "post"
    },
    "exhibits_search": {
        "path": "/exhibits/exhibits_search",
        "method": "get"
    },
    "exhibit_modify": {
        "path": "/exhibits/exhibit_modify",
        "method": "post"
    },
    "exhibit_search": {
        "path": "/exhibits/exhibit_search",
        "method": "get"
    },
    "exhibits_release": {
        "path": "/exhibits/exhibits_release",
        "method": "post"
    },
    //用户
    "register": {
        "path": "/user/register",
        "method": "post"
    },
    "login": {
        "path": "/user/login",
        "method": "post"
    },
    "log_out": {
        "path": "/user/log_out",
        "method": "post"
    },
    "users_search": {
        "path": "/user/search_user",
        "method": "get"
    },
    "user_delete": {
        "path": "/user/delete_user",
        "method": "post"
    },
    "user_state_modify": {
        "path": "/user/banned_user",
        "method": "post"
    },
    "index": {
        "path": "/index",
        "method": "get"
    },
    "user_exam": {
        "path": "/user/review_user",
        "method": "post"
    },
    "user_likes": {
        "path": "/user/user_likes",
        "method": "get"
    },
    "user_comment": {
        "path": "/user/user_comment",
        "method": "get"
    },
    "user_collection": {
        "path": "/user/user_collection",
        "method": "get"
    },
    "avatar_upload": {
        "path": "/user/avatar_upload",
        "method": "post"
    },
    "get_avatar": {
        "path": "/user/get_avatar",
        "method": "get"
    },
    "user_history": {
        "path": "/user/user_history",
        "method": "get"
    },
    "bad_user": {
        "path": "/user/search_bad_user",
        "method": "get"
    },
    "user_bad_comment": {
        "path": "/user/search_user_bad_comment",
        "method": "get"
    },
    "release_user": {
        "path": "/user/release_users",
        "method": "post"
    },
    "modify_user_info": {
        "path": "/user/modify_user_info",
        "method": "post"
    },
    "verify": {
        "path": "/user/verify",
        "method": "post"
    },
    //action
    "like": {
        "path": "/action/like",
        "method": "post"
    },
    "comment": {
        "path": "/action/comment",
        "method": "post"
    },
    "collection": {
        "path": "/action/collection",
        "method": "post"
    },
    "delete_comments": {
        "path": "/action/delete_comments",
        "method": "post"
    },
    "search_tags": {
        "path": "/action/search_tags",
        "method": "get"
    },
    "add_tags": {
        "path": "/action/add_tags",
        "method": "post"
    },
    "delete_tags": {
        "path": "/action/delete_tags",
        "method": "post"
    },
    "search_history": {
        "path": "/action/search_history",
        "method": "get",
    },
    "delete_search_history": {
        "path": "/action/delete_search_history",
        "method": "post",
    },
    "release_comment": {
        "path": "/action/release_comments",
        "method": "post",
    },
}


export default API