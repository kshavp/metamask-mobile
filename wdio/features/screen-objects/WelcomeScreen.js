import {
  WELCOME_SCREEN_CAROUSEL_TITLE_ID,
  WELCOME_SCREEN_CAROUSEL_CONTAINER_ID,
  WELCOME_SCREEN_GET_STARTED_BUTTON_ID
} from '../testIDs/Screens/WelcomeScreen.testIds';
import {
  SPLASH_SCREEN_METAMASK_ANIMATION_ID
} from '../testIDs/Components/MetaMaskAnimation.testIds';
import Gestures from '../helpers/Gestures';
import Selectors from '../helpers/Selectors';

class WelcomeScreen {
  constructor() {
    this.CAROUSEL_RECTANGLES = null;
  }

  get splashScreenMetamaskAnimationId() {
    return Selectors.getElementByPlatform(SPLASH_SCREEN_METAMASK_ANIMATION_ID);
  }

  get getStartedButton() {
    return Selectors.getElementByPlatform(WELCOME_SCREEN_GET_STARTED_BUTTON_ID);
  }

  async verifySplashScreen() {
    const elem = await this.splashScreenMetamaskAnimationId
    await expect(elem).toBeDisplayed();
    await elem.waitForDisplayed({ reverse: true });
  }

  async verifyCarouselTitle(key) {
    const elem = Selectors.getElementByPlatform(WELCOME_SCREEN_CAROUSEL_TITLE_ID(key), true);
    await expect(elem).toBeDisplayed();
  }

  async swipeNextSlide() {
    const carouselRectangles = await this.getCarouselRect()
    console.log('carouselRectangles', carouselRectangles);
    const y = Math.round(carouselRectangles.y + (carouselRectangles.height / 2));
    await Gestures.swipe(
      { x: Math.round(carouselRectangles.width - (carouselRectangles.width * 0.10)), y },
      { x: Math.round(carouselRectangles.x + (carouselRectangles.width * 0.10)), y },
    );
  }

  async getCarouselRect() {
    // Get the rectangles of the carousel and store it in a global that will be used for a next call.
    // We dont want ask for the rectangles of the carousel if we already know them.
    // This will save unneeded webdriver calls.
    this.CAROUSEL_RECTANGLES = this.CAROUSEL_RECTANGLES || await driver.getElementRect(await $(`~${WELCOME_SCREEN_CAROUSEL_CONTAINER_ID}`).elementId);

    return this.CAROUSEL_RECTANGLES;
  }

  async clickGetStartedButton() {
    await Gestures.tap(this.getStartedButton);
  }
}



export default new WelcomeScreen();
