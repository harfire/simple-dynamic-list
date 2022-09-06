import { shallowMount } from '@vue/test-utils';
import SimpleList from '@/components/SimpleList.vue';

describe('SimpleList.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message';
    const wrapper = shallowMount(SimpleList, {
      propsData: { msg }
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
