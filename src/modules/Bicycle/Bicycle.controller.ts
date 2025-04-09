import { BicycleServices } from './Bicycle.service';
import catchAsync from '../../app/utils/catchAsync';
import sendResponse from '../../app/utils/sendResponse';

const createBicycle = catchAsync(async (req, res) => {
  const file = req.file;
  const result = await BicycleServices.createBicycleIntoDB(file, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bicycle created successfully',
    data: result,
  });
});
const getAllBicycle = catchAsync(async (req, res) => {
  const result = await BicycleServices.getAllBicycleFromDB(req.query);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bicycles retrieved successfully',
    data: result,
  });
});
const getSingleBicycle = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await BicycleServices.getSingleBicycleFromDB(productId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bicycle retrieved successfully',
    data: result,
  });
});
const updateBicycle = catchAsync(async (req, res) => {
  const { productId } = req.params;
  const result = await BicycleServices.updateBicycleIntoDB(
    productId,
    req.body,
    req?.file,
  );
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bicycle updated successfully',
    data: result,
  });
});
const deleteBicycle = catchAsync(async (req, res) => {
  const { productId } = req.params;
  await BicycleServices.deleteBicycleFromDB(productId);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bicycle deleted successfully',
    data: {},
  });
});
export const BicycleControllers = {
  createBicycle,
  getAllBicycle,
  getSingleBicycle,
  updateBicycle,
  deleteBicycle,
};
