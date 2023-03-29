import bz2file as bz2
import pickle
import config as cfg

PARAMS = cfg.PARAMS

def compressed_pickle(title, data):
    print("here")
    with bz2.BZ2File(title + ".pbz2", "w") as f:
        pickle.dump(data, f)


def decompress_pickle(file):

    data = bz2.BZ2File(file, "rb")
    data = pickle.load(data)
    return data


# # Find the XGB files
# xgboost_files = os.path.join("models/*_model_xgb_384")
# xgboost_models = glob.glob(xgboost_files)

# # Use each XGB model to predict on corresponding audio parameter
# for parameter, model in zip(PARAMS, xgboost_models):
#     print("1")
#     with open(model, 'rb') as f:
#         xgb_model = pickle.load(f)
#     print("2")
#     compressed_pickle(str(parameter+"_model_xgb_384"), xgb_model)

