import Image from "next/image";

function PaymentOptions() {
  // const options = [
  //   {
  //     service: "Wave Money",
  //     account_number: "091234567",
  //     account_name: "U Kyaw Kyaw",
  //   },
  //   {
  //     service: "KBZ Pay",
  //     account_number: "091234567",
  //     account_name: "U Kyaw Kyaw",
  //   },
  //   {
  //     service: "CB Pay",
  //     account_number: "091234567",
  //     account_name: "U Kyaw Kyaw",
  //   },
  // ];
  return (
    <>
      {/* <table className="mx-auto my-2 mb-4" id="table-detail">
        <tbody className="text-sm">
          {options.map((option, index) => {
            return (
              <div key={index}>
                <tr>
                  <td className="text-right pr-2 py-1 text-black">
                    {option.service}:
                  </td>
                  <td className="text-left pl-2 text-gray-600 ">
                    {option.account_number}
                  </td>
                </tr>
                <tr>
                  <td className="text-right pr-2 py-1 text-black">Name:</td>
                  <td className="text-left pl-2 text-gray-600 ">
                    {option.account_name}
                  </td>
                </tr>
              </div>
            );
          })}
        </tbody>
      </table> */}
      <div className="py-4 flex flex-col justify-center items-center ">
        <p className="text-center">This is the QR code for KBZ Pay. Scan and complete the payment.</p>
        <Image
          src="/images/payment.png"
          alt="payment"
          width={500}
          height={300}
          className="w-60 "
        />
      </div>
    </>
  );
}

export default PaymentOptions;
