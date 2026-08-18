import { LoginForm, loginSchema } from './auth.schema';
import { TestBed } from '@angular/core/testing';
import { form } from '@angular/forms/signals';
import { signal } from '@angular/core';
import { expect } from 'vitest';

describe('loginSchema', () => {
  function createLoginForm(initial: LoginForm) {
    return TestBed.runInInjectionContext(() => form(signal(initial), loginSchema));
  }

  it('is invalid when both fields are empty', () => {
    const f = createLoginForm({ userName: '', password: 'secret' });
    expect(f().invalid()).toBe(true);
  });

  it('flags a required error on empty userName', () => {
    const f = createLoginForm({ userName: '', password: 'secret' });
    expect(
      f
        .userName()
        .errors()
        .some((e) => e.kind === 'required'),
    ).toBe(true);
  });

  it('flags a required error on empty password', () => {
    const f = createLoginForm({ userName: 'john', password: '' });
    expect(
      f
        .password()
        .errors()
        .some((e) => e.kind === 'required'),
    ).toBe(true);
  });

  it('is valid when both fields are filled', () => {
    const f = createLoginForm({ userName: 'john', password: 'secret' });
    expect(f().invalid()).toBe(false);
  });
});
