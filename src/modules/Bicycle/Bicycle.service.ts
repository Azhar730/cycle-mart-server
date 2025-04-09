import QueryBuilder from '../../app/builder/QueryBuilder';
import { sendImageToCloudinary } from '../../app/utils/imageUpload';
import { TBicycle } from './Bicycle.interface';
import { Bicycle } from './Bicycle.model';

const createBicycleIntoDB = async (file: any, payload: TBicycle) => {
  const imageName = `${payload.name} ${payload.brand}`;
  const path = file?.path;
  const { secure_url } = await sendImageToCloudinary(imageName, path);
  payload.image = secure_url as string;
  const result = await Bicycle.create(payload);
  return result;
};
const getAllBicycleFromDB = async (query: Record<string, unknown>) => {
  const searchableFields = [
    'name',
    'brand',
    'model',
    'category',
    'availability',
  ];
  const bicyclesQuery = new QueryBuilder(
    Bicycle.find({ isDeleted: false }),
    query,
  )
    .search(searchableFields)
    .filter()
    .sort()
    .paginate();
  const result = await bicyclesQuery.modelQuery;
  return result;
};
const getSingleBicycleFromDB = async (id: string) => {
  const result = await Bicycle.findById(id);
  return result;
};
const updateBicycleIntoDB = async (
  id: string,
  payload: Partial<TBicycle>,
  file?: any,
) => {
  let secure_url;
  if (file) {
    const imageName = `${payload.name} ${payload.brand}`;
    const path = file?.path;
    const response = await sendImageToCloudinary(imageName, path);
    secure_url = response.secure_url;
  }
  const updatedFields = {
    ...payload,
    ...(secure_url ? { image: secure_url } : {}),
    ...(payload.quantity !== undefined && { inStock: payload.quantity > 0 }),
  };
  const result = await Bicycle.findByIdAndUpdate(id, updatedFields, {
    new: true,
  });
  return result;
};
const deleteBicycleFromDB = async (id: string) => {
  const result = await Bicycle.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true },
  );
  return result;
};
export const BicycleServices = {
  createBicycleIntoDB,
  getAllBicycleFromDB,
  getSingleBicycleFromDB,
  updateBicycleIntoDB,
  deleteBicycleFromDB,
};
