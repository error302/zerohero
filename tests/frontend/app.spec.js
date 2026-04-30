const { test, expect } = require('@playwright/test');

test.describe('KCSE Prep Academy E2E', () => {
  test('App loads successfully and shows dashboard', async ({ page }) => {
    await page.goto('/');
    
    // Check main title
    await expect(page.locator('.logo')).toContainText('KCSE');
    await expect(page.locator('.hero-title')).toContainText('Welcome to KCSE Prep Academy');
    
    // Check if the 4 subjects are visible
    await expect(page.locator('.card-title', { hasText: 'Mathematics' })).toBeVisible();
    await expect(page.locator('.card-title', { hasText: 'Biology' })).toBeVisible();
    await expect(page.locator('.card-title', { hasText: 'Chemistry' })).toBeVisible();
    await expect(page.locator('.card-title', { hasText: 'Physics' })).toBeVisible();
  });

  test('User can navigate to a subject and view topics', async ({ page }) => {
    await page.goto('/');
    
    // Click on Mathematics
    await page.click('.card:has-text("Mathematics")');
    
    // Ensure the breadcrumb is updated
    await expect(page.locator('#breadcrumb')).toContainText('Mathematics');
    
    // Ensure form tabs exist
    await expect(page.locator('.form-tab', { hasText: 'Form 1' })).toBeVisible();
    await expect(page.locator('.form-tab', { hasText: 'Form 2' })).toBeVisible();
    
    // Check that a topic like Natural Numbers is visible
    await expect(page.locator('.tc-name', { hasText: 'Natural Numbers' })).toBeVisible();
  });
  
  test('Timetable loads correctly', async ({ page }) => {
    await page.goto('/');
    await page.click('.btn-sched');
    await expect(page.locator('.hero-title')).toContainText('KCSE Study Timetable');
  });
});
