
class mapping_name:
  def __init__(self, mapped_value):
    self.mapped_value = mapped_value

  @classmethod
  def index_name(cls,code=None):
    data_mapping = {
      0: '沪深300',
      1: '中证500',
      2: '中证1000',
      3: '国证2000',
      4: '中证2000',
      5: '万得全A',
      6: '华证微盘',
      7: '万得微盘',
      8: '南华商品指数',
      9: '招商证券市场中性指数',
      10: '招商证券CTA指数',
      11: '国君期货中周期时序动量'
    }
    mapped_value = data_mapping.get(code)
    return cls(mapped_value)

  @classmethod
  def wei_name(cls,code=None):
    data_mapping = {
      0: '超额计算',
      1: '绝对净值',
    }
    mapped_value = data_mapping.get(code)
    return cls(mapped_value)
  def to_string(self):
    return self.mapped_value

if __name__ == '__main__':
  a=mapping_name.index_name(code=3).to_string()
  print(a)
