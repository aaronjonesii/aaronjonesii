import {
  AnimationTriggerMetadata,
  trigger,
} from '@angular/animations';
import {
  FadeInOutAnimation,
} from '../../shared/animations/fade-in-out.animations';

export const HomeAnimations: AnimationTriggerMetadata[] = [
  trigger('titleAnimation', FadeInOutAnimation[0].definitions),
  trigger('subtitleAnimation', FadeInOutAnimation[0].definitions),
  trigger('contactAnimation', FadeInOutAnimation[0].definitions),
  trigger('imageAnimation', FadeInOutAnimation[0].definitions),
  trigger('marqueeAnimation', FadeInOutAnimation[0].definitions),
  trigger('appointmentAnimation', FadeInOutAnimation[0].definitions),
];
