import numpy as np

data = np.array(
  [0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002,
   0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002,
   0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002,
   0.002, 0.002, 0.002, 0.002, 0.001, 0.001, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002,
   0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.002, 0.003, 0.003, 0.003, 0.003, 0.003,
   0.003, 0.003, 0.003, 0.003, 0.003, 0.002, 0.002, 0.002, 0.002, 0.002, 0.004, 0.003, 0.003, 0.003, 0.003, 0.002,
   0.003, 0.003, 0.002, 0.002, 0.003, 0.003, 0.003, 0.002, 0.002, 0.002, 0.002, 0.002, 0.003, 0.002, 0.002, 0.002,
   0.002, 0.003, 0.003, 0.003, 0.003, 0.003, 0.003,0.]
  )

mean_thresh_std = np.mean(data)
print(mean_thresh_std)
len = np.size(data)
print(len)
spread_std_array = np.empty(len, dtype=float)




for i in range(len):
  spread_std_array[i] = data[i] / mean_thresh_std
  print(f'计算结果{ data[i]}/{mean_thresh_std}==',data[i] / mean_thresh_std)
std_thresh = np.std(spread_std_array)
print(std_thresh)
