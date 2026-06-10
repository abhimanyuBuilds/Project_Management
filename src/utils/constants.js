export const UserRoleEnum = {
    ADMIN: 'admin',
    PROJECT_ADMIN: 'project_admin',
    MEMBER: 'member'
}



export const AvailableUserRole = Object.values(UserRoleEnum)


export const TaskStatusEnum = {
    TODO: 'todo',
    IN_PROGRESS: 'in_progress',
    DONE: 'done'
}

export const AvailableTaskStatus = Object.values(TaskStatusEnum)



export const permissions = {
    admin: [
        'create_user',
        'delete_user',
        'update_user',
        'read_user'
    ],

    PROJECT_ADMIN: [
        'update_user',
        'read_user'
    ],

    member: [
        'read_user'
    ]

};

export const AvailablePermissions = Object.values(permissions);