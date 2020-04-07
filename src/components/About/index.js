import React from 'react'
import { Row, Container, Col } from 'react-grid-system'
import { useHistory } from 'react-router-dom'

import styles from '../Policy/Policy.module.scss'
import Button from '../common/Button'

/**
* @author zilahir
* @function About
* */

const About = () => {
	const history = useHistory()
	return (
		<div className={styles.aboutWrapper}>
			<Container
				fluid
			>
				<Row>
					<Col className={styles.dark} lg={3} />
					<Col className={styles.middle} lg={6}>
						<Button
							labelText="Back"
							onClick={() => history.goBack()}
							buttonClass={styles.buttonContainer}
						/>
						<div className={styles.textContainer}>
							<h1>
								What is Prompter.me?
							</h1>
							<p>
								Prompter.me is a free, <a href="https://github.com/zilahir/teleprompter">open source</a> teleprompter on the web. Using it doesn&apos;t
								require you to download anything or to sign up for anything.
								It was made to give content creators an actually useful free teleprompter,
								which would allow them to use it on their own without any additional apps or hacks.
								After all, a lot of video content creators out there are one-person operations,
								and we know using a prompter without help can be a real pain in the tuchus.
							</p>
							<h1>
								Prompter.me was designed by Mikko Oittinen and developed by Richard Zilahi.
							</h1>
							<p>
								Mikko is a Finnish designer and content creator, who knows the pain of using
								bad prompters all too well. Mikko is a graphic designer by trade, and you
								canlook at (and buy) some of his work at <a href="https://clubcamomile.com/">Club Camomile</a>, an online store for
								sustainable and ethical print streetwear he co-founded. For his occasional videos
								(which almost always utilize teleprompters), check out his YouTube channel
								<a href="https://www.youtube.com/channel/UChUl9DYGrz2rQ4avj12Dm3Q">Expert Opinion</a>.
							</p>
							<p>
								Richard is a fullstack developer originally from Hungary,
								now living in Finland. Richard is enthusiastic about modern stacks,
								clean code and open source technology. Interested in big
								data and deep data analysis.
								Richard is the co-host of the
								podcast &quot;Szauna Szenátus&quot;, in Hungarian language.
								Check out some of Richard&apos;s work on his <a href="https://github.com/zilahir">GitHub page</a> and his <a href="https://richardzilahi.hu">website</a>.
							</p>
							<h1>
								How to use Prompter.me?
							</h1>
							<p>
							Prompter.me consists of three main parts: The Editor, which is the front page
							view when you go to prompter.me, the Prompter, which is the text scroller itself,
							and the Remote, which is a mobile remote controller.
							</p>
							<p>
								In the Editor view, you can enter and edit your script in the text field in
								the middle of the page. On the left, there are controls for
								your prompter&apos;s text
								size, scrolling speed, and more. Use these controls to create the perfect
								prompter for you.
								In the top right corner, you can see a preview of how your prompter will look.
								It&apos;s not exact, but it should give you a pretty good idea.
								The &quot;flip for reflection&quot; toggle vertically mirrors your prompter, so
								if you&apos;re using one of those fancy glass screens that reflect your prompter in
								front of your camera lens, you can do that without flipping your whole screen.
							</p>
							<p>
								Launch your Prompter by clicking the big &quot;Open&quot;
								button in the bottom right corner of the Editor view. This will open your
								Prompter view in a new tab. There are instructions at the top of the Prompter
								view for controlling your prompter. Press Space to play/pause the feed, press
								up/down or pgup/pgdown to navigate up or down in the feed and press left to slow
								the prompter down or right to speed it up. You can also left click your mouse to
								play/pause your feed.
							</p>
							<p>
								If you wish to make changes to your prompter, go to the Editor view, make
								your changes and press &quot;Update&quot; to send those changes to your
								prompter feed.
							</p>
							<p>
								NOTE: You can open your prompter feed on any device using
								the &quot;Stream address&quot;
								found in the Editor view! When you control the prompter
								in one device, the same controls apply to all devices viewing
								that prompter. This means that you can open the same prompter
								view on two different devices, and when you hit play or pause on one,
								it plays or pauses the other one simultaneously as well.
							</p>
							<p>
								THAT MEANS: If you edit and open prompter on one
								device that&apos;s near you, you can take another device and place it
								next to your camera. You can then use the device near you to control
								the prompter next to your camera!
							</p>
							<p>
								BY FOLLOWING THE INSTRUCTIONS ABOVE, YOU CAN USE ANY DEVICE
								TO CONTROL YOUR PROMPTER, THAT CAN BE ON ANY DEVICE!
							</p>
							<p>
								Finally, the Remote. Once you have a prompter feed created on
								your computer or tablet, you can use your phone as a remote controller.
								Go to prompter.me on your mobile device and you will be redirected
								to a page with one input field. Enter your Session ID, which
								you can find in the Editor view. Once you&apos;re connected,
								you can use your phone to control the prompter feed in another device!
								You can sign up to Prompter.me in order to save your projects and open
								them later. We only ask for an email address and a password, and
								we do absolutely nothing with your data. We don&apos;t even
								verify your email at the moment, so if you won&apos;t forget your password,
								you can just use a fake address. We&apos;re not going to advertise
								to you, or sell your data, or
								honestly do anything whatsoever with it. Cool? Cool.
							</p>
							<h1>
								Legal stuff
							</h1>
							<p>
								You can read our <a href="/policy">privacy policy</a>.
							</p>
						</div>
					</Col>
					<Col className={styles.dark} lg={3} />
				</Row>
			</Container>
		</div>
	)
}

export default About
