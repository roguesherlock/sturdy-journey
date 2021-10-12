import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import Button from "src/components/Button";
import { Formik, FormikConfig } from "formik";
import * as Yup from "yup";
import { createProduct } from "src/lib/api";
import { toast } from "react-toastify";

interface Props {
  onSuccess: () => void;
}
export const AddProductForm = ({ onSuccess }: Props) => {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  interface Form {
    name: string;
    description: string;
    price: number;
  }

  const initialValues: Form = { name: "", description: "", price: 0 };
  const validationSchema = Yup.object().shape({
    name: Yup.string().nullable().required().label("Name"),
    description: Yup.string().nullable().required().label("Description"),
    price: Yup.number()
      .nullable()
      .required()
      .positive()
      .integer()
      .label("Price"),
  });

  const handleSubmit: FormikConfig<Form>["onSubmit"] = async (
    values,
    actions
  ) => {
    try {
      const review = await createProduct({
        ...values,
      });
      closeModal();
      onSuccess();
      toast.success("Product created successfully");
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong please try again.");
    }
  };

  return (
    <>
      <div className="flex items-center justify-center">
        <Button label="Add product" onClick={openModal} />
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
                      <div className="mt-2 space-y-2">
                        <div className="sm:grid sm:items-start">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            Name
                          </label>
                          <div className="mt-1 sm:col-span-2">
                            <input
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.name}
                              name="name"
                              type="text"
                              id="name"
                              className="max-w-lg block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          {props.errors.name && (
                            <p className="mt-2 text-sm text-red-600">
                              {props.errors.name}
                            </p>
                          )}
                        </div>
                        <div className="sm:grid sm:items-start sm:pt-2">
                          <label
                            htmlFor="description"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            Description
                          </label>
                          <div className="mt-1 sm:col-span-2">
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
                        <div className="sm:grid sm:items-start">
                          <label
                            htmlFor="price"
                            className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          >
                            Price
                          </label>
                          <div className="mt-1 sm:col-span-2">
                            <input
                              onChange={props.handleChange}
                              onBlur={props.handleBlur}
                              value={props.values.price}
                              name="price"
                              type="text"
                              id="price"
                              className="max-w-lg block w-full shadow-sm focus:ring-sky-500 focus:border-sky-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                            />
                          </div>
                          {props.errors.price && (
                            <p className="mt-2 text-sm text-red-600">
                              {props.errors.price}
                            </p>
                          )}
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

export default AddProductForm;
