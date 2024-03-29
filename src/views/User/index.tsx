import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { BsTwitter, BsGithub } from "react-icons/bs";
import { FiMail } from "react-icons/fi";
import { Toaster, toast } from "react-hot-toast";
import { Navbar } from "@/components";
import { tokenAddress } from "@/contract/address";
import { parseEther } from "viem";
import { ethers } from "ethers";
import { UserAccount } from "@/constant";

export default function User({
  parsedData,
}: {
  parsedData: UserAccount | undefined;
}) {
  const [name, setName] = useState("");
  const [bio, setBio] = useState("");
  const [icon, setIcon] = useState("");
  const [lens, setLens] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [twitter, setTwitter] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState(0);
  const [modal, setModal] = useState(false);
  const [ownerAddress, setOwnerAddress] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendGHO = async () => {
    setIsLoading(true);
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(
      tokenAddress,
      [
        {
          inputs: [
            {
              name: "to",
              type: "address",
            },
            {
              name: "value",
              type: "uint256",
            },
          ],
          name: "transfer",
          outputs: [
            {
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
      ],
      signer
    );
    const wei = parseEther(amount.toString());
    try {
      const tx = await contract.transfer(ownerAddress, wei, {
        gasLimit: 100000,
      });
      await tx.wait();
      toast.success("Transaction successful");
      setIsLoading(false);
    } catch (e: any) {
      console.error(e);
      toast.error(e?.message || "Transaction failed");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (parsedData) {
      console.log("parsedData", parsedData.twitter);
      try {
        setName(parsedData.name);
        setBio(parsedData.description);
        setIcon(parsedData.image);
        setLens(parsedData.lens);
        setGithubUrl(parsedData.github);
        setTwitter(parsedData.twitter);
        setEmail(parsedData.email);
        setOwnerAddress(parsedData.address);
      } catch (e) {
        console.log(e);
      }
    }
  }, [parsedData]);

  return (
    <>
      <Head>
        <title>{name} | Liquid</title>
        <meta name="description" content="Liquid" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-full items-center justify-center">
        <Navbar />
        <div className="flex items-center justify-center">
          <div className="w-[90%] md:w-[60%] p-5 md:p-10 top-40 relative flex flex-col md:flex-row items-center justify-between border border-neutral-500/80 rounded-xl shadow-xl shadow-teal-900/40">
            <span className="flex flex-col w-1/2 gap-y-1 md:gap-y-4 justify-center items-center">
              <Image
                src={icon}
                loader={() => icon}
                width="250"
                height="250"
                alt="Liquid"
                className="w-50 h-50 object-cover sm:mr-3 justify-center mb-5 sm:mb-0 rounded-full"
              />
              <p className="font-bold text-neutral-50 text-3xl md:text-5xl mb-1">
                {name}
              </p>
            </span>
            <span className="flex flex-col w-4/5 md:w-1/2 text-center sm:text-left text-2xl font-semibold whitespace-nowrap">
              <p className="text-neutral-200 font-medium text-lg md:text-4xl mb-4">
                {bio}
              </p>
              <div className="flex flex-row justify-center sm:justify-start space-x-2">
                <Link
                  href={"https://twitter.com/" + twitter}
                  target="_blank"
                  className="p-2 w-fit text-sm border border-gray-300 rounded-full hover:bg-[#1DA1F2] hover:border-[#1DA1F2] text-white"
                >
                  <BsTwitter className="text-2xl md:text-3xl" />
                </Link>
                <Link
                  href={"mailto:" + email}
                  target="_blank"
                  className="p-2 w-fit text-sm border border-gray-300 rounded-full hover:bg-violet-500 hover:border-violet-500 text-white"
                >
                  <FiMail className="text-2xl md:text-3xl" />
                </Link>
                <Link
                  href={"https://github.com/" + githubUrl}
                  target="_blank"
                  className="p-2 w-fit text-sm border border-gray-300 rounded-full hover:bg-black hover:border-black text-white"
                >
                  <BsGithub className="text-2xl md:text-3xl" />
                </Link>
                <Link
                  href={"https://hey.xyz/u/" + lens}
                  target="_blank"
                  className="px-1.5 py-1 w-fit text-sm border border-gray-300 rounded-full hover:bg-green-600 hover:border-lime-600 text-white"
                >
                  <Image
                    src="/images/icons/lens.png"
                    height={25}
                    width={25}
                    alt="social"
                    className="w-7 h-8 md:w-9 md:h-9"
                  />
                </Link>
              </div>
              <div className="flex flex-auto mt-2 md:justify-start justify-center">
                <button
                  data-modal-target="reward-modal"
                  data-modal-toggle="reward-modal"
                  className="block w-fit mt-4 md:mt-2 px-4 p-3 text-white bg-teal-400 hover:bg-teal-500 focus:ring-1 focus:outline-none focus:ring-teal-400 font-medium rounded-lg text-sm text-center"
                  type="button"
                  onClick={() => {
                    setModal(true);
                  }}
                >
                  Give thanks
                </button>
              </div>
              <div
                id="reward-modal"
                aria-hidden="true"
                className={`${
                  modal ? "flex" : "hidden"
                } fixed justify-center items-center backdrop-blur-sm z-50 w-full p-4 overflow-x-hidden overflow-y-auto inset-0 max-h-full`}
              >
                <div className="relative w-full max-w-md max-h-full">
                  <div className="relative rounded-lg shadow bg-gray-900">
                    <button
                      type="button"
                      className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center"
                      data-modal-hide="reward-modal"
                      onClick={() => {
                        setModal(false);
                        setIsLoading(false);
                      }}
                    >
                      <svg
                        className="w-3 h-3"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                      </svg>
                      <span className="sr-only">Close modal</span>
                    </button>
                    <div className="px-6 py-6 lg:px-8">
                      <h3 className="mb-4 text-xl font-medium text-white">
                        Reward your chad
                      </h3>
                      <form className="space-y-6" action="#">
                        <div>
                          <label className="block mb-2 text-sm font-normal text-gray-300">
                            Number which can make em happy
                          </label>
                          <input
                            onChange={(e) => {
                              setAmount(parseInt(e.target.value));
                            }}
                            type="number"
                            name="amount"
                            id="amount"
                            className="bg-gray-50 border border-slate-400 text-gray-900 text-sm rounded-lg focus:ring-violet-500 focus:border-range-500 block w-full p-2.5"
                            placeholder="4 GHO"
                            required
                          />
                        </div>
                        <button
                          onClick={async (e) => {
                            e.preventDefault();
                            await sendGHO();
                          }}
                          type="submit"
                          className="w-full hover:text-white bg-teal-500 focus:ring-1 focus:outline-none hover:bg-teal-600 focus:ring-teal-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                        >
                          {isLoading ? (
                            <span className="flex gap-1 items-center justify-center">
                              <svg
                                aria-hidden="true"
                                role="status"
                                className="inline mr-2 w-4 h-4 text-gray-100 animate-spin"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                ></path>
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="#2dd4bf"
                                ></path>
                              </svg>{" "}
                              Sending...
                            </span>
                          ) : (
                            "Send tip"
                          )}
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </span>
          </div>
        </div>
      </main>
      <Toaster />
    </>
  );
}
