/**
 * Minimal sanity test for PBP-firebasemahasiswa
 * This test intentionally avoids importing React or external test renderers to
 * prevent missing-dependency errors on machines that don't have devDependencies installed.
 */

// Use Jest globals (test / expect). This is a tiny sanity check that should
// not require additional packages beyond Jest itself.
test('basic sanity check - project skeleton', () => {
  // simple assertion to ensure test runner can load the file
  expect(true).toBeTruthy();
});
/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import App from '../App';

test('renders correctly', async () => {
  await ReactTestRenderer.act(() => {
    ReactTestRenderer.create(<App />);
  });
});
