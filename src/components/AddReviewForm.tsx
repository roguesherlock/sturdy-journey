import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Button from "./Button";
import { Formik, FormikConfig } from "formik";
import * as Yup from "yup";
import Rating from "./Rating";
import { createProductReview } from "src/lib/api";
import { toast } from "react-toastify";

interface Props {
  product: Product;
  onSuccess: () => void;
}
export const AddReviewForm = ({ product, onSuccess }: Props) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  interface Form {
    description: string;
    rating: number;
  }

  const initialValues: Form = { description: "", rating: 0 };
  const validationSchema = Yup.object().shape({
    description: Yup.string().required().label("Description"),
    rating: Yup.number().required().min(0.5).label("Rating"),
  });

  const handleSubmit: FormikConfig<Form>["onSubmit"] = async (
    values,
    actions
  ) => {
    try {
      const review = await createProductReview({
        ...values,
        product_id: product.id,
      });
      closeModal();
      onSuccess();
      toast.success("Review created successfully");
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong please try again.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <Button label="Add review" onClick={openModal} />
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          onClose={closeModal}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900"
                >
                  What's your rating?
                </Dialog.Title>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {(props) => (
                    <>
                      <div className="mt-2">
                        <div className="sm:grid sm:gap-4 sm:items-start">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            Rating
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <Rating
                              name="rating"
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.rating}
                            />
                          </div>
                          {props.errors.rating && (
                            <p className=" text-sm text-red-600">
                              {props.errors.rating}
                            </p>
                          )}
                        </div>
                        <div className="sm:grid sm:gap-4 sm:items-start sm:pt-2">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            About
                          </label>
                          <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <textarea
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.description}
                              id="description"
                              name="description"
                              rows={3}
                              className="max-w-lg shadow-sm block w-full focus:ring-sky-500 focus:border-sky-500 sm:text-sm border border-gray-300 rounded-md"
                              placeholder="Start typing..."
                            />
                            {props.errors.description && (
                              <p className="mt-2 text-sm text-red-600">
                                {props.errors.description}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <Button
                          label="Submit review"
                          onClick={props.submitForm}
                        />
                      </div>
                    </>
                  )}
                </Formik>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AddReviewForm;
