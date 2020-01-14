# terser-webpack-plugin-out-of-memory

This project reliably reproduces `JavaScript heap out of memory` errors in `terser-webpack-plugin`.

To run:

```
npm install
npm run build
```

```
<--- Last few GCs --->

[82967:0x10288c000]    11381 ms: Mark-sweep 2047.5 (2052.8) -> 2047.4 (2054.1) MB, 13.4 / 0.0 ms  (+ 0.7 ms in 4 steps since start of marking, biggest step 0.7 ms, walltime since start of marking 16 ms)
 (average mu = 0.275, current mu = 0.191) allocation [82967:0x10288c000]    11398 ms: Mark-sweep 2048.6 (2054.1) -> 2048.6 (2055.1) MB, 10.8 / 0.0 ms  (+ 2.6 ms in 9 steps since start of marking, bigges
t step 1.8 ms, walltime since start of marking 15 ms) (average mu = 0.241, current mu = 0.210) allocation

<--- JS stacktrace --->

==== JS stack trace =========================================

    0: ExitFrame [pc: 0x1009311f9]
    1: StubFrame [pc: 0x10096bc8c]
Security context: 0x3d0524d808a1 <JSObject>
    2: replace [0x3d0524d8cf51](this=0x3d053b544819 <Very long string[3425476]>,0x3d05fb41f289 <JSRegExp <String[#18]: [<>\/\u2028\u2029]>>,0x3d05fb41f321 <JSFunction escapeUnsafeChars (sfi = 0x3d05e31a
7931)>)
    3: serialize(aka serialize) [0x3d05e31a7b79] [/Users/chris.larose/dev/big-webpack-config/node_modules/serialize-ja...

FATAL ERROR: Ineffective mark-compacts near heap limit Allocation failed - JavaScript heap out of memory
 1: 0x10007f231 node::Abort() [/Users/chris.larose/.asdf/installs/nodejs/12.14.1/bin/node]
 2: 0x10007f3b5 node::OnFatalError(char const*, char const*) [/Users/chris.larose/.asdf/installs/nodejs/12.14.1/bin/node]
 3: 0x100176887 v8::Utils::ReportOOMFailure(v8::internal::Isolate*, char const*, bool) [/Users/chris.larose/.asdf/installs/nodejs/12.14.1/bin/node]
 4: 0x100176823 v8::internal::V8::FatalProcessOutOfMemory(v8::internal::Isolate*, char const*, bool) [/Users/chris.larose/.asdf/installs/nodejs/12.14.1/bin/node]
 5: 0x1002fa9d5 v8::internal::Heap::FatalProcessOutOfMemory(char const*) [/Users/chris.larose/.asdf/installs/nodejs/12.14.1/bin/node]
 6: 0x1002fc0a4 v8::internal::Heap::RecomputeLimits(v8::internal::GarbageCollector) [/Users/chris.larose/.asdf/installs/nodejs/12.14.1/bin/node]
 7: 0x1002f8f77 v8::internal::Heap::PerformGarbageCollection(v8::internal::GarbageCollector, v8::GCCallbackFlags) [/Users/chris.larose/.asdf/installs/nodejs/12.14.1/bin/node]
 8: 0x1002f6f5d v8::internal::Heap::CollectGarbage(v8::internal::AllocationSpace, v8::internal::GarbageCollectionReason, v8::GCCallbackFlags) [/Users/chris.larose/.asdf/installs/nodejs/12.14.1/bin/node]
 9: 0x100302674 v8::internal::Heap::AllocateRawWithLightRetry(int, v8::internal::AllocationType, v8::internal::AllocationAlignment) [/Users/chris.larose/.asdf/installs/nodejs/12.14.1/bin/node]
10: 0x1003026ef v8::internal::Heap::AllocateRawWithRetryOrFail(int, v8::internal::AllocationType, v8::internal::AllocationAlignment) [/Users/chris.larose/.asdf/installs/nodejs/12.14.1/bin/node]
11: 0x1002d13fa v8::internal::Factory::NewRawOneByteString(int, v8::internal::AllocationType) [/Users/chris.larose/.asdf/installs/nodejs/12.14.1/bin/node]
12: 0x100517ca2 v8::internal::String::SlowFlatten(v8::internal::Isolate*, v8::internal::Handle<v8::internal::ConsString>, v8::internal::AllocationType) [/Users/chris.larose/.asdf/installs/nodejs/12.14.1
/bin/node]
13: 0x100620cdd v8::internal::Runtime_RegExpExecMultiple(int, unsigned long*, v8::internal::Isolate*) [/Users/chris.larose/.asdf/installs/nodejs/12.14.1/bin/node]
14: 0x1009311f9 Builtins_CEntry_Return1_DontSaveFPRegs_ArgvOnStack_NoBuiltinExit [/Users/chris.larose/.asdf/installs/nodejs/12.14.1/bin/node]
15: 0x10096bc8c Builtins_RegExpReplace [/Users/chris.larose/.asdf/installs/nodejs/12.14.1/bin/node]
```

A workaround that works is to increase the size of Node's old space:

```
node --max-old-space-size=4096 node_modules/.bin/webpack
```

The issue is described in https://github.com/webpack-contrib/terser-webpack-plugin/issues/143

My fix is proposed in https://github.com/webpack-contrib/terser-webpack-plugin/pull/206
