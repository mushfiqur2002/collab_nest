import Swal from "sweetalert2";

export function notification(message) {
    if (message === 'success') {
        Swal.fire({
            title: "Success!",
            text: "Signup was successful!",
            icon: "success",
            confirmButtonText: "OK"
        });
    } else {
        Swal.fire({
            title: "Error!",
            text: "Something went wrong!",
            icon: "error",
            confirmButtonText: "OK"
        });
    }
}
