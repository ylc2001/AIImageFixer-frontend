import requests
import re
import time
import random
import urllib.request
import os

arr = []
def getArr():
    rootPath = 'https://360.quanjing.com/fs/nn/QP61324292/'
    for i in ['r','l', 'u', 'd', 'b', 'f']:
        for j in ['/l1/1/l1_', '/l2/1/l2_', '/l1/2/l1_', '/l2/2/l2_', '/l1/3/l1_', '/l2/3/l2_']:
            for z in range(1,4):
                for k in range(1,4):
                    arr.append(rootPath + i + j + i + "_" + str(z) + "_" + str(k) + ".jpg" )

def getimg(arr,topath):
    for url in arr:
        # 把图片下载到本地存储
        path = os.path.join(topath, url.rsplit("/",maxsplit=1)[1])
        print(path)
        try:
            urllib.request.urlretrieve(url, filename=path)
        except Exception as e:
            print(e)
        # time.sleep(1)


if __name__ == '__main__':

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36'
    }
    getArr()
    toPath = '../assets/outside_raw'
    getimg(arr, toPath)