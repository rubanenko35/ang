import {trigger, animate, style, group, animateChild, query, stagger, transition} from '@angular/animations';

export const fadeInAnimation = trigger(
  'routerTransition',
  [
    transition(
      ':enter',
      [
        style({  opacity: 0.5 }),
        animate('600ms', style({ opacity: 1 }))
      ]
    ),
    transition(
      ':leave',
      [
        style({  opacity: 0.7 }),
        animate('600ms', style({  opacity: 0 }))
      ]
    )
  ]
);

export const childAnimation = trigger('childAnimation', [
  transition('* => true', [
    style({ opacity: 0 }),
    animate('600ms', style({ opacity: 1 }))
  ]),
  transition('true => false', [
    style({ opacity: 1 }),
    animate('0ms', style({ opacity: 0.3 }))
  ]),

]);

