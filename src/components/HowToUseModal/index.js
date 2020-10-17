import React from 'react'
import PropTypes from 'prop-types'
import { Row, Container, Col } from 'react-grid-system'
import CloseIcon from '@material-ui/icons/Close'
import classnames from 'classnames'

import styles from '../Policy/Policy.module.scss'
import modalStyles from './HowToUseModal.module.scss'
import Modal from '../common/Modal'

/**
* @author zilahir
* @function HowToUseModal
* */

const HowToUseModal = ({
	isVisible,
	handleClose,
	selector,
}) => (
	<Modal
		isShowing={isVisible}
		hide={handleClose}
		selector={selector}
		hasCloseIcon={false}
		wrapperClassname={modalStyles.howtoUseModalWrapper}
		overlayClassName={modalStyles.aboutModalOverlay}

	>
		<div className={classnames(
			styles.aboutWrapper,
			styles.about,
			modalStyles.aboutWrapper,
		)}
		>
			<Container
				fluid
			>
				<Row>
					<Col
						className={styles.middle}
						lg={12}
					>
						<div className={styles.closeBtnContainer}>
							<button
								type="button"
								onClick={handleClose}
								className={styles.closeBtn}
							>
								<CloseIcon htmlColor="#ffffff" />
							</button>
						</div>
						<div className={styles.textContainer}>
							<h1 className={styles.title}>
								How to use Prompter.me?
							</h1>
							<p>
								How to use Prompter.me Prompter.me is a web-based teleprompter.
								If you’re reading this, I’m assuming you know what all those words mean, so I can
								jump straight into how it works.
							</p>
							<p>
								Prompter.me can be divided into three parts: the editor,
								the prompter, and the remote controller, which I will be referring to just as
								the remote for brevity’s sake, which I probably undid already
								with this drawn out explanation.
							</p>
							<p>
								Anyway.
							</p>
							<p>
								You can create and edit the content and appearance of your project in the editor,
								play and control it in the prompter and use the remote on
								your phone to control the prompterfrom a distance.
							</p>
							<h2>
								Editor
							</h2>
							<p>
								The editor is where you land when you go to prompter.me on a computer.
								It’s where you control the content of the prompter, its speed, and its appearance.
							</p>
							<ul>
								<h3>
									At the top, you have the main menu:
								</h3>
								<li>
									<p>
										New starts a new project. All unsaved progress will be lost.
									</p>
								</li>
								<li>
									<p>
										Save saves the current project.
									</p>
								</li>
								<li>
									<p>
										Save As… saves a duplicate of the current project.
									</p>
								</li>
								<li>
									<p>
										Projects is a menu where you can load or delete previously saved projects.
									</p>
								</li>
								<li>
									<p>
										Sign Up is for creating an account. This isn’t necessary for using Prompter.me,
										but it’s necessary if you want to save your projects.
									</p>
								</li>
								<li>
									<p>
										Log In is for logging into your previously created account.
										You can’t save or load projects unless you’re logged in.
									</p>
								</li>
								<li>
									<p>
										About Prompter.me is just some info on what this thing is.
									</p>
								</li>
								<li>
									<p>
										How to Use is the page you’re reading right now. This one.
									</p>
								</li>
							</ul>
							<ul>
								<h3>
									The properties of the prompter are on the left:
								</h3>
								<li>
									<p>
										Text size: Controls the size
										of the text in the prompter.
									</p>
								</li>
								<li>
									<p>
										Letter spacing: Controls the spacing
										between individual characters in the prompter.
									</p>
								</li>
								<li>
									<p>
										Line spacing: Controls the spacing between lines in the prompter.
									</p>
								</li>
								<li>
									<p>
										Scroll width: Controls how much of the
										available screen space the prompter takes up.
									</p>
								</li>
								<li>
									<p>
										Scroll speed: Controls the speed of the prompter.
										This can also be adjusted on the fly.
									</p>
								</li>
								<li>
									<p>
										Color scheme: Controls the colors of the prompter.
										Dark means white text on a black background, Light means the opposite.
									</p>
								</li>
								<li>
									<p>
										Font: You can choose from three different font options for the prompter.
										Sans-serif (like Arial) is the default and the best for most people,
										but there is a Serif font (like Times) and a monospaced font
										(like Courier or typewriters),
										if you prefer one of those.
									</p>
								</li>
								<li>
									<p>
										Alignment: Controls prompter text alignment.
										The text is aligned to the left by default,
										but centered and right aligned are available, too.
									</p>
								</li>
								<li>
									<p>
										Flip for reflection: This mirrors the prompter, when turned on.
										This is useful, if you’re reflecting your prompter onto a piece of glass
										in front of the camera. This way you won’t have to flip the whole screen.
									</p>
								</li>
							</ul>
							<h3>
								The text editor is in the middle:
							</h3>
							<p>
								The text editor is based on segments. You can just use the
								one segment, but especially if your script is divided into several parts,
								or if there are multiple speakers, segments can help you keep things clear.
							</p>
							<p>
								You can add new segments using the Add Segment button at
								the top of the editor, or add a pause using the Add Pause button next to it.
							</p>
							<p>
								There’s one segment already there when you arrive to Prompter.me
								or start a new project. You can give the segment a name up top and
								give it a color from the circle between the segment name and the segment
								removal button. The segment removal button, or the big X in the top right
								corner, deletes the segment. In the text field, you can type or
								paste your script content.
							</p>
							<p>
								A pause is something you can add between segments.
								When there’s a pause after a segment, once the prompter
								has scrolled through the segment and reaches the pause, it
								automatically pauses there. This is very useful if you’re recording
								and want to take breaks between segments.
							</p>
							<h3>
								The preview is at the top right:
							</h3>
							<p>
								The preview approximates what you’re prompter will look like.
								The box below is the prompter, the box above is the prompter, mirrored.
								This is mostly relevant if you’re reflecting your prompter.
								Test Scroll gives you an idea of the scroll speed.
							</p>
							<ul>
								<h3>
									The prompter controls are on the right:
								</h3>
								<li>
									<p>
										Session ID displays the unique ID for your session.
										This will be useful when using the remote.
									</p>
								</li>
								<li>
									<p>
										Stream address is a direct link to the prompter.
									</p>
								</li>
								<li>
									<p>
										Remote control address is a direct link to the remote for this prompter stream.
									</p>
								</li>
								<li>
									<p>
										Create Prompter creates a prompter stream.
									</p>
								</li>
								<li>
									<p>
										Open Prompter opens the prompter stream in a new window or tab in your browser.
										It’s only visible once you’ve created a prompter.
									</p>
								</li>
								<li>
									<p>
										Send Updates is only visible when you’ve created a prompter
										and made changes to it.
										You can edit your prompter and then send updates to it once you’re satisfied.
										These updates also need to be applied on the prompter.
									</p>
								</li>
							</ul>
							<h3>
								Prompter
							</h3>
							<p>
								The prompter is where the words scroll.
								You can open the prompter on any device with a web browser using the stream address.
								You can also open it on multiple devices and use any of them to control them all.
								This is especially handy when you have, say, two laptops and you want to
								set up one next to the camera and control it with the other one. Or when you
								have multiple cameras and want to set up a device with a prompter
								next to each camera, while controlling them using a device next to you.
							</p>
							<p>
								At the top of the prompter there’s an info bar, that disappears
								while scrolling. It has simple instructions for use and the Update button.
								The Update button is visible whenever updates have been sent from the editor.
								You must click or tap the Update button to apply those changes.
								This is to protect the prompter to jump somewhere in the
								middle of scrolling if updates are sent.
							</p>
							<p>
								In the prompter itself, segments are outlined and titled with their assigned color.
								Pauses are indicated with a horizontal line between segments.
								When the prompter reaches a pause, it automatically pauses.
								You must press play (spacebar/left click/remote) again to resume.
							</p>
						</div>
					</Col>
				</Row>
			</Container>
		</div>
	</Modal>
)

HowToUseModal.propTypes = {
	handleClose: PropTypes.func.isRequired,
	isVisible: PropTypes.bool.isRequired,
	selector: PropTypes.string.isRequired,
}

export default HowToUseModal
