import CharacterEyeClose from '@/assets/character_eye_close.svg';
import CharacterHot from '@/assets/character_hot.svg';
import CharacterLaugh from '@/assets/character_laugh.svg';
import CharacterLaptop from '@/assets/character_laptop.svg';
import CharacterZombie from '@/assets/character_zombie.svg';

//
//
//

const CotatoCharacterImageMap = {
  eye_close: CharacterEyeClose,
  hot: CharacterHot,
  laugh: CharacterLaugh,
  laptop: CharacterLaptop,
  zombie: CharacterZombie,
};

export type CotatoCharacterImageMapType = keyof typeof CotatoCharacterImageMap;

/**
 * Convert Cotato character image.
 * @param image - Cotato character image. (eye_close, hot, laugh, laptop, zombie)
 */
export const convertCotatoCharcterImage = (image: CotatoCharacterImageMapType) => {
  return CotatoCharacterImageMap[image];
};
