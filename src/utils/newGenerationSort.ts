import { CotatoGenerationInfoResponse } from 'cotato-openapi-clients';

const generationSort = (
  generations: CotatoGenerationInfoResponse[],
): CotatoGenerationInfoResponse[] => {
  return generations.sort((left, right) => {
    if (left?.generationNumber && right?.generationNumber) {
      return right.generationNumber - left.generationNumber;
    }

    return 0;
  });
};

export default generationSort;
