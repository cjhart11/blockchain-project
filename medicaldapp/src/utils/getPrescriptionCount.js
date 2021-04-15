import store from "../redux/store";

export const PRESCRIPTION_COUNT = "PRESCRIPTION_COUNT"; // action type

// action creator (dispatch sends this to redux reducer)
function prescriptionCount(data) {
  return {
    type: PRESCRIPTION_COUNT,
    payload: data
  };
}

//
//  set up the blockchain shadow contract, user address, and user prescription count.  Put into redux store.
//

async function getPrescriptionCount(CZ, userAddress) {
  // get number of prescriptions owned by the user account
  let userPrescriptionCount = +(await CZ.balanceOf(userAddress));  // + convert a string to an integer

  // do a binary search to estimate total number of prescriptions.

  var high = 8192;
  var low = 0;
  var middle = 4096;

  while (low < high) {
      try {
      await CZ.prescriptions(middle);
      low = middle + 1;
      middle = Math.floor(low + (high - low) / 2);
    } catch {
      high = middle - 1;
      middle = Math.floor(low + (high - low) / 2);
    }
  }

  // put state data into the REDUX store for easy access from other pages and components

  let data = {
    totalPrescriptionCount: Math.max(low-1, 1),   // from binary search
    userPrescriptionCount          //EC7 shorthand for totalPrescriptionCount:totalPrescriptionCount because of same variable name
  };

  store.dispatch(prescriptionCount(data));
}

export default getPrescriptionCount;
