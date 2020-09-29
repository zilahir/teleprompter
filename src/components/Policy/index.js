import React from 'react'
import { Row, Container, Col } from 'react-grid-system'
import ReactGA from 'react-ga'
import { useHistory } from 'react-router-dom'
import CloseIcon from '@material-ui/icons/Close'
import classnames from 'classnames'

import styles from './Policy.module.scss'
import { POLICY } from '../../utils/consts'

/**
* @author zilahir
* @function Policy
* */

const Policy = () => {
	ReactGA.pageview(`${POLICY}`)
	const history = useHistory()
	return (
		<div className={classnames(
			styles.aboutWrapper,
			styles.dark,
		)}
		>
			<Container
				fluid
			>
				<Row>
					<Col className={styles.middle} lg={12}>
						<div className={classnames(
							styles.closeBtnContainer,
							styles.policyBtn,
						)}
						>
							<button
								type="button"
								onClick={() => history.goBack()}
								className={styles.closeBtn}
							>
								<CloseIcon htmlColor="#ffffff" />
							</button>
						</div>
						<div className={styles.textContainer}>
							<p>
								Privacy Policy for Prompter.me
							</p>
							<p>
								At Prompter.me, accessible from prompter.me,
								one of our main priorities is the privacy of our visitors.
								This Privacy Policy document contains types of information that is
								collected and recorded by Prompter.me and how we use it.
							</p>
							<p>
								If you have additional questions or require more information about our
								Privacy Policy, do not hesitate to contact us through email at info@prompter.me
							</p>
							<p>
								General Data Protection Regulation (GDPR) We are a Data
								Controller of your information.
							</p>
							<p>
								Prompter.me legal basis for collecting and using the personal information described
								in this Privacy Policy depends on the Personal Information we collect
								and the specific context in which we collect the information:
							</p>
							<p>
								Prompter.me needs to perform a contract with you You have given Prompter.me
								permission to do so Processing your personal information is in Prompter.me
								legitimate interests Prompter.me needs to comply with the law Prompter.me will
								retain your personal information only for as long as is necessary for the
								purposes set out in this Privacy Policy. We will retain and use your information to
								the extent necessary to comply with our legal obligations, resolve disputes, and
								enforce our policies.
							</p>
							<p>
								If you are a resident of the European Economic Area (EEA), you have certain data
								protection rights. If you wish to be informed what Personal
								Information we hold about you and if you want it to be removed
								from our systems, please contact us.
							</p>
							<p>
								In certain circumstances, you have the following data protection rights:
							</p>
							<p>
								<ul>
									<li>
										The right to access, update or to delete the information we have on you.
									</li>
									<li>
										The right of rectification.
									</li>
									<li>
										The right to object.
									</li>
									<li>
										The right of restriction.
									</li>
									<li>
										The right to data portability
									</li>
									<li>
										The right to withdraw consent
									</li>
									<li>
										Log Files
									</li>
								</ul>
							</p>
							<p>
								Prompter.me follows a standard procedure of using log files.
								These files log visitors when they visit websites.
								All hosting companies do this and a part of hosting services&apos; analytics.
								The information collected by log files include internet protocol (IP) addresses,
								browser type, Internet Service Provider (ISP), date and time stamp,
								referring/exit pages,
								and possibly the number of clicks.
								These are not linked to any information that is personally identifiable.
								The purpose of the information is for analyzing trends, administering the site,
								tracking users&apos; movement on the website, and gathering demographic information.
							</p>
							<p>
								Cookies and Web Beacons Like any other website,
								Prompter.me uses &apos;cookies&apos;.
								These cookies are used to store information including visitors&apos; preferences,
								and the pages on the website that the visitor accessed or visited.
								The information is used to optimize the users&apos; experience by
								customizing our web page content based on visitors&apos;
								browser type and/or other information.
							</p>
							<p>
								Third Party Privacy Policies Prompter.me&apos;s Privacy Policy does not apply
								to other advertisers or websites.
							</p>
							<p>
								You can choose to disable cookies through your individual browser options.
								To know more detailed information about cookie management with specific web
								browsers,
								it can be found at the browsers&apos; respective websites.
							</p>
							<p>
								Children&apos;s Information Another part of our priority is
								adding protection for children while using the internet. We encourage
								parents and guardians to observe, participate in, and/or monitor and guide their
								online activity.
							</p>
							<p>
								Prompter.me does not knowingly collect any Personal Identifiable Information from
								children under the age of 13. If you think that your child provided this kind
								of information on our website, we strongly encourage you to contact us immediately
								and we will do our best efforts to promptly remove such information
								from our records.
							</p>
							<p>
								Online Privacy Policy Only Our Privacy Policy applies only to our
								online activities and is valid for visitors to our website with regards to the
								information that they shared and/or collect in Prompter.me.
								This policy is not applicable to any information collected offline or via channels
								other than this website.
							</p>
							<p>
								By using our website, you hereby consent to our Privacy Policy and agree to
								its terms.
							</p>
							<p>
								Consent
							</p>
							<p>
								By using our website, you hereby consent to our Privacy Policy and
								agree to its terms.
							</p>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	)
}

export default Policy
