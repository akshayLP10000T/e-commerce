import { setItemsData, setSelectedItem } from "@/redux/storeSlice";
import axios from "axios";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { itemData } from "@/types/item";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Loader2 } from "lucide-react";
import { readFileAsDataUrl } from "@/lib/utils";
import { gettingAllItems } from "@/hooks/useGetAllItems";
import { gettingStoreData } from "@/hooks/useGetStoreData";

const Items = () => {
  const dispatch = useDispatch();
  const { storeData, itemData, selectedItem } = useSelector(
    (store: any) => store.store
  );

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddItem({
      ...addItem,
      [e.target.name]:
        e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
  };

  const [loading, setLoading] = useState<boolean>(false);
  const imageRef = useRef(null);
  const [file, setFile] = useState<any>(null);

  const [addItem, setAddItem] = useState<Partial<itemData>>({
    name: "",
    description: "",
    imageFile: file,
    price: 0,
  });

  const fileChangeHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      setFile(file);
      setAddItem({ ...addItem, imageFile: file });
      await readFileAsDataUrl(file);
    }
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("name", addItem.name!);
      formData.append("description", addItem.description!);
      formData.append("price", addItem.price!.toString());

      if (!addItem.imageFile) {
        toast.error("Image file is required");
      } else {
        formData.append("image", addItem.imageFile!);

        const res = await axios.post(
          "http://localhost:8080/api/v1/store/add-item",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
          }
        );

        if (res.data.success) {
          dispatch(setItemsData([res.data.item, ...itemData]));
          toast.success(res.data.message);
        }
      }
    } catch (error: any) {
      toast.error(error?.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (id: string) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `http://localhost:8080/api/v1/store/delete/${id}`,
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        dispatch(setSelectedItem(null));
        gettingAllItems(dispatch);
        gettingStoreData(dispatch);
        toast.success(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-3">
      <div className="w-full flex justify-between">
        <h1 className="text-4xl font-extrabold">Items</h1>
        <Dialog>
          <DialogTrigger>
            <Button className="text-white">Add Item</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add a new item to your store</DialogTitle>
              <DialogDescription>
                Add items regularly to get more attention and earn more money
                with us
              </DialogDescription>
            </DialogHeader>
            <form
              className="space-y-2 w-full"
              onSubmit={(e) => submitHandler(e)}
            >
              <div>
                <Label htmlFor="name">Name</Label>
                <div className="relative">
                  <Input
                    name="name"
                    onChange={(e) => {
                      inputChangeHandler(e);
                    }}
                    value={addItem.name}
                    placeholder="Item Name"
                  ></Input>
                </div>
              </div>
              <div className="relative">
                <Label htmlFor="description">Description</Label>
                <Input
                  name="description"
                  onChange={(e) => {
                    inputChangeHandler(e);
                  }}
                  type="text"
                  value={addItem.description}
                  placeholder="Description"
                ></Input>
              </div>
              <div className="relative">
                <Label htmlFor="price">Price</Label>
                <Input
                  name="price"
                  onChange={(e) => {
                    inputChangeHandler(e);
                  }}
                  type="number"
                  value={addItem.price}
                  placeholder="Price"
                ></Input>
              </div>
              <div className="relative">
                <Label htmlFor="image">
                  <div className="text-white w-full h-dit bg-primary text-center py-3 rounded-lg">
                    {file ? "Image Selected" : "Select Image"}
                  </div>
                </Label>
                <Input
                  onChange={fileChangeHandler}
                  accept="image/*"
                  type="file"
                  name="image"
                  id="image"
                  ref={imageRef}
                  className="hidden"
                />
              </div>
              <div>
                {loading ? (
                  <Button disabled type="submit" className="w-full text-white">
                    <Loader2 className="animate-spin" /> Please wait...
                  </Button>
                ) : (
                  <Button type="submit" className="w-full text-white">
                    Submit
                  </Button>
                )}
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {storeData?.items?.length !== 0 && (
        <div>
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 mt-5">
            {itemData.map((item: any) => (
              <Card
                key={item?._id}
                className="shadow-md hover:shadow-xl duration-200 transition-shadow h-full flex flex-col justify-between"
              >
                <CardHeader>
                  <img
                    className="w-full rounded-lg h-60 object-cover object-center"
                    src={item?.image}
                    alt="img"
                  />
                </CardHeader>
                <div>
                  <CardContent>
                    <CardTitle>{item?.name}</CardTitle>
                    <CardDescription>{item?.description}</CardDescription>
                    <p className="mt-5">
                      <span className="font-bold">Amount:-</span> {item?.price}
                    </p>
                  </CardContent>
                  <CardFooter className="w-full grid grid-cols-2 gap-5">
                    <Dialog>
                      <DialogTrigger>
                        <Button
                          variant={"outline"}
                          className="text-red-600 w-full"
                          onClick={() => dispatch(setSelectedItem(item))}
                        >
                          Delete
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Are you shure to delete following item
                          </DialogTitle>
                          <DialogDescription>
                            Check the item and confirm to delete the item
                          </DialogDescription>
                        </DialogHeader>
                        <img src={selectedItem?.image} alt="img" />
                        <div className="w-full flex justify-between gap-10">
                          {loading ? (
                            <Button
                              disabled
                              className="w-full"
                              variant={"outline"}
                            >
                              <Loader2 className="animate-spin" /> Please
                              wait...
                            </Button>
                          ) : (
                            <Button
                              onClick={() => deleteHandler(selectedItem._id)}
                              className="w-full"
                              variant={"outline"}
                            >
                              Yes
                            </Button>
                          )}
                        </div>
                      </DialogContent>
                    </Dialog>
                    <Button className="text-white">Edit</Button>
                  </CardFooter>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Items;
