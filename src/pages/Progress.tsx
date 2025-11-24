import { useState } from "react";
import {
  useDeleteProgressMutation,
  useGetProgressQuery,
  useUpdateProgressMutation,
} from "@/redux/progressSlice";
import { useUploadImageMutation } from "@/redux/ImageSlice";

import Loading from "@/components/Loading";
import { Trash2, Upload, X, Loader } from "lucide-react";
import { handleError, handleSuccess } from "@/utils/Toastify";
import Swal from "sweetalert2";

interface progressForm {
  weight: string;
  bodyFat: string;
  waist: string;
  chest: string;
}

export default function ProgressTracker() {
  const { data, isLoading, refetch, error } = useGetProgressQuery(undefined);
  const [updateProgress] = useUpdateProgressMutation();
  const [deleteProgress] = useDeleteProgressMutation();
  const [uploadImage, { isLoading: uploading }] = useUploadImageMutation();

  const [file, setFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [form, setForm] = useState<progressForm>({
    weight: "",
    bodyFat: "",
    waist: "",
    chest: "",
  });

  const handleSelectFile = (e: any) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(selectedFile);
  };

  const removeImage = () => {
    setFile(null);
    setImagePreview(null);
  };

 const handleSubmit = async (e: any) => {
  e.preventDefault();
  const hasWeight = form.weight && form.weight.trim() !== "";
  const hasBodyFat = form.bodyFat && form.bodyFat.trim() !== "";
  const hasWaist = form.waist && form.waist.trim() !== "";
  const hasChest = form.chest && form.chest.trim() !== "";
  const hasPhoto = file && imagePreview;

  const hasAnyData = hasWeight || hasBodyFat || hasWaist || hasChest || hasPhoto;

   if (!hasAnyData) {
    Swal.fire({
  icon: "error",
  title: "Oops...",
  text: " Please enter measurement or upload a photo",

});

    return;
  }

  try {
    let photoUrl = null;

    
    if (file && imagePreview) {
      setUploadingPhoto(true);
      const uploadResult = await uploadImage(file).unwrap();
      photoUrl = uploadResult.secure_url;
     
      setUploadingPhoto(false);
    }

    
    const progressData: any = {
      weight: form.weight ? parseFloat(form.weight) : undefined,
      bodyFat: form.bodyFat ? parseFloat(form.bodyFat) : undefined,
      waist: form.waist ? parseFloat(form.waist) : undefined,
      chest: form.chest ? parseFloat(form.chest) : undefined,
    };

   //adding url if user added poto
    if (photoUrl) {
      progressData.photoUrl = photoUrl;
    }

    
    Object.keys(progressData).forEach(
      (key) => progressData[key] === undefined && delete progressData[key]
    );

   

    
    await updateProgress(progressData).unwrap();

    // Reset
    setForm({ weight: "", bodyFat: "", waist: "", chest: "" });
    removeImage();
    refetch();
   
    Swal.fire({
  title: "keep going!",
  text: "progress saved successfully",
  icon: "success"
});
  } catch (error) {
    console.error("Error:", error);
    handleError("Failed to save progress");
    setUploadingPhoto(false);
  }
};

  const handleDelete = async (id: any) => {
     const result = await Swal.fire({
    title: "Are you sure?",
    text: "This action cannot be undone.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  });

  if (!result.isConfirmed) return;

  try {
    await deleteProgress(id).unwrap();
    refetch();

    Swal.fire({
      position: "top-end",
      icon: "success",
      title: "Your progress has been deleted",
      showConfirmButton: false,
      timer: 1500
    });
  } catch (error) {
    console.log(error);
    Swal.fire("Error", "Failed to delete progress", "error");
  }
  };

  if (isLoading)
    return (
     
        <Loading />
    
    );

  if (error)
    return (
      <p className="text-2xl font-bold text-red-500 text-center min-h-screen flex items-center justify-center">
        Failed to load Your Progress, login to continue
      </p>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Your Body Progress
          </h1>
          <p className="text-slate-400">
            Track your fitness journey week by week
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-1">
            <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600 shadow-xl sticky top-6">
              <h2 className="text-xl font-bold text-white mb-6">
                Log Measurement
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="75.5"
                    value={form.weight}
                    onChange={(e) =>
                      setForm({ ...form, weight: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Body Fat %
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="18.5"
                    value={form.bodyFat}
                    onChange={(e) =>
                      setForm({ ...form, bodyFat: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-orange-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Waist (cm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="88"
                    value={form.waist}
                    onChange={(e) =>
                      setForm({ ...form, waist: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Chest (cm)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    placeholder="105"
                    value={form.chest}
                    onChange={(e) =>
                      setForm({ ...form, chest: e.target.value })
                    }
                    className="w-full px-4 py-3 bg-slate-600/50 border border-slate-500 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">
                    Progress Photo (Optional)
                  </label>
                  {!imagePreview ? (
                    <label className="flex items-center justify-center gap-2 w-full px-4 py-3 border-2 border-dashed border-slate-500 rounded-lg cursor-pointer hover:border-amber-400 transition-colors bg-slate-600/30">
                      <Upload size={20} className="text-slate-400" />
                      <span className="text-slate-400 text-sm">
                        Click to upload photo
                      </span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleSelectFile}
                        disabled={uploading || uploadingPhoto}
                        className="hidden"
                      />
                    </label>
                  ) : (
                    <div className="relative">
                      <img
                        src={imagePreview}
                        alt="Preview"
                        className="w-full h-40 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={removeImage}
                        disabled={uploading || uploadingPhoto}
                        className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 p-2 rounded-full transition-colors disabled:opacity-50"
                      >
                        <X size={18} className="text-white" />
                      </button>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={uploading || uploadingPhoto}
                  className="w-full py-3 px-4 bg-linear-to-r from-amber-400 to-orange-500 text-slate-900 font-bold rounded-lg hover:shadow-lg hover:shadow-amber-500/30 transition-all duration-300 mt-6 flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {uploadingPhoto ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      Updating your Progress...
                    </>
                  ) : (
                    "Save Progress"
                  )}
                </button>
              </form>
            </div>
          </div>

          {/* History Section */}
          <div className="lg:col-span-2">
            <h3 className="text-2xl font-bold text-white mb-6">History</h3>
            <div className="space-y-4 max-h-[700px] overflow-y-auto">
              {data?.progress?.entries?.length ? (
                data.progress.entries.map((p: any, i: any) => (
                  <div
                    key={i}
                    className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-6 border border-slate-600 hover:border-slate-500 transition-all group"
                  >
                    <div className="flex justify-between items-center mb-4">
                      <p className="text-lg font-medium text-white">
                        <span className="text-slate-400 font-light mr-3">
                          Date:
                        </span>
                        <span className="text-green-400 font-bold tracking-wide">
                          {p.date
                            ? new Date(p.date).toLocaleDateString("en-GB")
                            : "N/A"}
                        </span>
                      </p>

                      <button
                        className="text-red-500 p-2 rounded-full hover:bg-red-500/20 transition-transform duration-200 transform hover:scale-110 active:scale-95"
                        onClick={() => handleDelete(p._id)}
                        aria-label="Delete Progress Record"
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>

                    {/* Photo Display */}
                    {p.photoUrl && (
                      <div className="mb-4">
                        <img
                          src={p.photoUrl}
                          alt="Progress"
                          className="w-full h-48 object-cover rounded-lg border border-slate-500 hover:scale-105 transition-transform"
                        />
                      </div>
                    )}

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                      {p.weight && (
                        <div className="bg-slate-600/50 rounded-lg p-4 border border-slate-500/50">
                          <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">
                            Weight
                          </p>
                          <p className="text-xl font-bold text-amber-400">
                            {p.weight}
                            <span className="text-xs text-slate-400 ml-1">kg</span>
                          </p>
                        </div>
                      )}
                      {p.bodyFat && (
                        <div className="bg-slate-600/50 rounded-lg p-4 border border-slate-500/50">
                          <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">
                            Body Fat
                          </p>
                          <p className="text-xl font-bold text-orange-400">
                            {p.bodyFat}
                            <span className="text-xs text-slate-400 ml-1">%</span>
                          </p>
                        </div>
                      )}
                      {p.waist && (
                        <div className="bg-slate-600/50 rounded-lg p-4 border border-slate-500/50">
                          <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">
                            Waist
                          </p>
                          <p className="text-xl font-bold text-cyan-400">
                            {p.waist}
                            <span className="text-xs text-slate-400 ml-1">cm</span>
                          </p>
                        </div>
                      )}
                      {p.chest && (
                        <div className="bg-slate-600/50 rounded-lg p-4 border border-slate-500/50">
                          <p className="text-slate-400 text-xs uppercase tracking-wide mb-2">
                            Chest
                          </p>
                          <p className="text-xl font-bold text-blue-400">
                            {p.chest}
                            <span className="text-xs text-slate-400 ml-1">cm</span>
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl p-12 border border-slate-600 text-center">
                  <p className="text-slate-400">No progress recorded yet.</p>
                  <p className="text-slate-500 text-sm mt-2">
                    Start by logging your first measurement!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}