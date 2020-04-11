const apiRoot = process.env.NODE_ENV === 'development' ? 'http://localhost:5000' : process.env.REACT_APP_BACKEND

export const apiEndpoints = {
	authUser: `${apiRoot}/auth`,
	newUser: `${apiRoot}/users`,
	newPrompter: `${apiRoot}/prompter`,
	getAllPrompterForUser: `${apiRoot}/allprompterbyuserid`,
	delPrompter: `${apiRoot}/prompter`,
	modifyPrompter: `${apiRoot}/prompter`,
	newPrompterWithoutAuth: `${apiRoot}/prompternoauth`,
	updatePrompterNoAuth: `${apiRoot}/prompternoauth`,
	modifyPassword: `${apiRoot}/users`,
	getPasswordRecovery: `${apiRoot}/passwordrecovery`,
	requestPasswordRecovery: `${apiRoot}/passwordrecovery`,
	setPasswordRecoveryToUsed: `${apiRoot}/resetpassword`,
	getToken: `${apiRoot}/auth/token`,
	sendPasswordRecoveryEmail: `${apiRoot}/email/password`,
}
