const apiRoot = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.REACT_APP_BACKEND_V2

export const apiEndpoints = {
	authUser: `${apiRoot}/auth`,
	newUser: `${apiRoot}/users`,
	newPrompter: `${apiRoot}/prompter`,
	getAllPrompterForUser: `${apiRoot}/allprompterbyuserid`,
	getPrompterBySlug: `${apiRoot}/prompter`,
	delPrompter: `${apiRoot}/prompter`,
	modifyPrompter: `${apiRoot}/prompter`,
	newPrompterWithoutAuth: `${apiRoot}/prompternoauth`,
	updatePrompterNoAuth: `${apiRoot}/prompternoauth`,
	modifyPassword: `${apiRoot}/users`,
	modifyUserName: `${apiRoot}/users`,
	getPasswordRecovery: `${apiRoot}/passwordrecovery`,
	requestPasswordRecovery: `${apiRoot}/passwordrecovery`,
	setPasswordRecoveryToUsed: `${apiRoot}/passwordrecovery`,
	resetpassword: `${apiRoot}/resetpassword`,
	getToken: `${apiRoot}/auth/token`,
	sendPasswordRecoveryEmail: `${apiRoot}/email/password`,
	checkPassword: `${apiRoot}/auth/checkpassword`,
	deleteUser: `${apiRoot}/users`,
	getPrompterBySlugNoAuth: `${apiRoot}/prompternoauth`,
}

export const socketEndpoint = 'ws://localhost:5000'
