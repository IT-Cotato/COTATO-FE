import { CotatoGenerationInfoResponse } from 'cotato-openapi-clients';

const generationSort = (generationList: CotatoGenerationInfoResponse[]) => {
  generationList.sort(
    (left, right) => (right?.generationNumber ?? 0) - (left?.generationNumber ?? 0),
  );
  return generationList;
};

export default generationSort;
