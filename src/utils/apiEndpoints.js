const apiRoot = 'http://localhost:5000'

export const apiEndpoints = {
	authUser: `${apiRoot}/auth`,
	newUser: `${apiRoot}/user`,
	newPrompter: `${apiRoot}/prompter`,
	getAllPrompterForUser: `${apiRoot}/allprompterbyuserid`,
	delPrompter: `${apiRoot}/prompter`,
}
