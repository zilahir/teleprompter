const apiRoot = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.BACKEND

export const apiEndpoints = {
	authUser: `${apiRoot}/auth`,
	newUser: `${apiRoot}/users`,
	newPrompter: `${apiRoot}/prompter`,
	getAllPrompterForUser: `${apiRoot}/allprompterbyuserid`,
	delPrompter: `${apiRoot}/prompter`,
	modifyPrompter: `${apiRoot}/prompter`,
	newPrompterWithoutAuth: `${apiRoot}/prompternoauth`,
}
