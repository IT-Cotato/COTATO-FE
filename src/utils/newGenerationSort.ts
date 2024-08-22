import { CotatoGenerationInfoResponse } from 'cotato-openapi-clients';

const generationSort = (
  generations: CotatoGenerationInfoResponse[],
): CotatoGenerationInfoResponse[] => {
  const newGenerations = [...generations];

  newGenerations.sort((left, right) => {
    if (left?.generationNumber && right?.generationNumber) {
      return right.generationNumber - left.generationNumber;
    }

    return 0;
  });

  return newGenerations;
};

export default generationSort;
