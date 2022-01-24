(module
 (type $i32_=>_i32 (func (param i32) (result i32)))
 (type $i32_=>_none (func (param i32)))
 (type $i32_i32_=>_i32 (func (param i32 i32) (result i32)))
 (type $i32_i32_=>_none (func (param i32 i32)))
 (type $none_=>_i32 (func (result i32)))
 (type $i32_i32_i32_=>_none (func (param i32 i32 i32)))
 (type $i32_i32_i32_=>_i32 (func (param i32 i32 i32) (result i32)))
 (type $none_=>_none (func))
 (type $i32_i32_i32_i32_=>_none (func (param i32 i32 i32 i32)))
 (type $i32_i32_i32_i32_=>_i32 (func (param i32 i32 i32 i32) (result i32)))
 (import "env" "abort" (func $~lib/builtins/abort (param i32 i32 i32 i32)))
 (import "massa" "assembly_script_get_data" (func $~lib/massa-sc-std/index/assembly_script_get_data (param i32) (result i32)))
 (import "massa" "assembly_script_has_data" (func $~lib/massa-sc-std/index/assembly_script_has_data (param i32) (result i32)))
 (import "massa" "assembly_script_get_call_stack" (func $~lib/massa-sc-std/index/assembly_script_get_call_stack (result i32)))
 (import "massa" "assembly_script_print" (func $~lib/massa-sc-std/index/assembly_script_print (param i32)))
 (import "massa" "assembly_script_set_data" (func $~lib/massa-sc-std/index/assembly_script_set_data (param i32 i32)))
 (global $~lib/json-as/index/WS1code (mut i32) (i32.const 0))
 (global $~lib/json-as/index/WS2code (mut i32) (i32.const 0))
 (global $~lib/json-as/index/WS3code (mut i32) (i32.const 0))
 (global $~lib/json-as/index/WS4code (mut i32) (i32.const 0))
 (global $~lib/json-as/index/WS5code (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/total (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/threshold (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/state (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/visitCount (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/pinSpace (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/iter (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/toSpace (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/white (mut i32) (i32.const 0))
 (global $~lib/rt/itcms/fromSpace (mut i32) (i32.const 0))
 (global $~lib/rt/tlsf/ROOT (mut i32) (i32.const 0))
 (global $~lib/json-as/index/unknownTrue (mut i32) (i32.const 0))
 (global $~lib/json-as/index/unknownFalse (mut i32) (i32.const 0))
 (global $~lib/json-as/index/unknownNull (mut i32) (i32.const 0))
 (global $~lib/json-as/index/empty_stringCode (mut i32) (i32.const 0))
 (global $assembly/token/MintArgs i32 (i32.const 19))
 (global $assembly/token/AllowArgs i32 (i32.const 21))
 (global $assembly/token/AllowanceArgs i32 (i32.const 22))
 (global $assembly/token/TransferArgs i32 (i32.const 23))
 (global $assembly/token/TransferFromArgs i32 (i32.const 24))
 (global $~lib/rt/__rtti_base i32 (i32.const 5376))
 (global $~lib/memory/__stack_pointer (mut i32) (i32.const 21972))
 (memory $0 1)
 (data (i32.const 1036) "\1c")
 (data (i32.const 1048) "\01\00\00\00\02\00\00\00\"")
 (data (i32.const 1068) "\1c")
 (data (i32.const 1080) "\01\00\00\00\02\00\00\00[")
 (data (i32.const 1100) "\1c")
 (data (i32.const 1112) "\01\00\00\00\02\00\00\00]")
 (data (i32.const 1132) "\1c")
 (data (i32.const 1144) "\01\00\00\00\02\00\00\00}")
 (data (i32.const 1164) "\1c")
 (data (i32.const 1176) "\01\00\00\00\02\00\00\00{")
 (data (i32.const 1196) "\1c")
 (data (i32.const 1208) "\01\00\00\00\08\00\00\00t\00r\00u\00e")
 (data (i32.const 1228) "\1c")
 (data (i32.const 1240) "\01\00\00\00\n\00\00\00f\00a\00l\00s\00e")
 (data (i32.const 1260) "\1c")
 (data (i32.const 1272) "\01\00\00\00\08\00\00\00n\00u\00l\00l")
 (data (i32.const 1292) "\1c")
 (data (i32.const 1304) "\01\00\00\00\04\00\00\00\\\00\"")
 (data (i32.const 1324) "\1c")
 (data (i32.const 1336) "\01\00\00\00\02\00\00\00 ")
 (data (i32.const 1356) "\1c")
 (data (i32.const 1368) "\01\00\00\00\02\00\00\00\n")
 (data (i32.const 1388) "\1c")
 (data (i32.const 1400) "\01\00\00\00\02\00\00\00\0d")
 (data (i32.const 1420) "\1c")
 (data (i32.const 1432) "\01\00\00\00\02\00\00\00\t")
 (data (i32.const 1452) "<")
 (data (i32.const 1464) "\01\00\00\00(\00\00\00A\00l\00l\00o\00c\00a\00t\00i\00o\00n\00 \00t\00o\00o\00 \00l\00a\00r\00g\00e")
 (data (i32.const 1516) "<")
 (data (i32.const 1528) "\01\00\00\00 \00\00\00~\00l\00i\00b\00/\00r\00t\00/\00i\00t\00c\00m\00s\00.\00t\00s")
 (data (i32.const 1644) "<")
 (data (i32.const 1656) "\01\00\00\00$\00\00\00I\00n\00d\00e\00x\00 \00o\00u\00t\00 \00o\00f\00 \00r\00a\00n\00g\00e")
 (data (i32.const 1708) ",")
 (data (i32.const 1720) "\01\00\00\00\14\00\00\00~\00l\00i\00b\00/\00r\00t\00.\00t\00s")
 (data (i32.const 1788) "<")
 (data (i32.const 1800) "\01\00\00\00\1e\00\00\00~\00l\00i\00b\00/\00r\00t\00/\00t\00l\00s\00f\00.\00t\00s")
 (data (i32.const 1852) "\1c")
 (data (i32.const 1864) "\01")
 (data (i32.const 1884) "\1c")
 (data (i32.const 1896) "\01\00\00\00\08\00\00\00b\00o\00o\00l")
 (data (i32.const 1916) "\1c")
 (data (i32.const 1928) "\01\00\00\00\n\00\00\00u\00s\00i\00z\00e")
 (data (i32.const 1948) "\1c")
 (data (i32.const 1960) "\01\00\00\00\02\00\00\00\\")
 (data (i32.const 1980) ",")
 (data (i32.const 1992) "\01\00\00\00\0e\00\00\00a\00d\00d\00r\00e\00s\00s")
 (data (i32.const 2028) "\1c")
 (data (i32.const 2040) "\01\00\00\00\02\00\00\00:")
 (data (i32.const 2060) "\1c")
 (data (i32.const 2072) "\01\00\00\00\02\00\00\00,")
 (data (i32.const 2092) "\1c")
 (data (i32.const 2104) "\01\00\00\00\0c\00\00\00a\00m\00o\00u\00n\00t")
 (data (i32.const 2124) "|")
 (data (i32.const 2136) "\01\00\00\00d\00\00\00t\00o\00S\00t\00r\00i\00n\00g\00(\00)\00 \00r\00a\00d\00i\00x\00 \00a\00r\00g\00u\00m\00e\00n\00t\00 \00m\00u\00s\00t\00 \00b\00e\00 \00b\00e\00t\00w\00e\00e\00n\00 \002\00 \00a\00n\00d\00 \003\006")
 (data (i32.const 2252) "<")
 (data (i32.const 2264) "\01\00\00\00&\00\00\00~\00l\00i\00b\00/\00u\00t\00i\00l\00/\00n\00u\00m\00b\00e\00r\00.\00t\00s")
 (data (i32.const 2316) "\1c")
 (data (i32.const 2328) "\01\00\00\00\02\00\00\000")
 (data (i32.const 2348) "0\000\000\001\000\002\000\003\000\004\000\005\000\006\000\007\000\008\000\009\001\000\001\001\001\002\001\003\001\004\001\005\001\006\001\007\001\008\001\009\002\000\002\001\002\002\002\003\002\004\002\005\002\006\002\007\002\008\002\009\003\000\003\001\003\002\003\003\003\004\003\005\003\006\003\007\003\008\003\009\004\000\004\001\004\002\004\003\004\004\004\005\004\006\004\007\004\008\004\009\005\000\005\001\005\002\005\003\005\004\005\005\005\006\005\007\005\008\005\009\006\000\006\001\006\002\006\003\006\004\006\005\006\006\006\007\006\008\006\009\007\000\007\001\007\002\007\003\007\004\007\005\007\006\007\007\007\008\007\009\008\000\008\001\008\002\008\003\008\004\008\005\008\006\008\007\008\008\008\009\009\000\009\001\009\002\009\003\009\004\009\005\009\006\009\007\009\008\009\009")
 (data (i32.const 2748) "\1c\04")
 (data (i32.const 2760) "\01\00\00\00\00\04\00\000\000\000\001\000\002\000\003\000\004\000\005\000\006\000\007\000\008\000\009\000\00a\000\00b\000\00c\000\00d\000\00e\000\00f\001\000\001\001\001\002\001\003\001\004\001\005\001\006\001\007\001\008\001\009\001\00a\001\00b\001\00c\001\00d\001\00e\001\00f\002\000\002\001\002\002\002\003\002\004\002\005\002\006\002\007\002\008\002\009\002\00a\002\00b\002\00c\002\00d\002\00e\002\00f\003\000\003\001\003\002\003\003\003\004\003\005\003\006\003\007\003\008\003\009\003\00a\003\00b\003\00c\003\00d\003\00e\003\00f\004\000\004\001\004\002\004\003\004\004\004\005\004\006\004\007\004\008\004\009\004\00a\004\00b\004\00c\004\00d\004\00e\004\00f\005\000\005\001\005\002\005\003\005\004\005\005\005\006\005\007\005\008\005\009\005\00a\005\00b\005\00c\005\00d\005\00e\005\00f\006\000\006\001\006\002\006\003\006\004\006\005\006\006\006\007\006\008\006\009\006\00a\006\00b\006\00c\006\00d\006\00e\006\00f\007\000\007\001\007\002\007\003\007\004\007\005\007\006\007\007\007\008\007\009\007\00a\007\00b\007\00c\007\00d\007\00e\007\00f\008\000\008\001\008\002\008\003\008\004\008\005\008\006\008\007\008\008\008\009\008\00a\008\00b\008\00c\008\00d\008\00e\008\00f\009\000\009\001\009\002\009\003\009\004\009\005\009\006\009\007\009\008\009\009\009\00a\009\00b\009\00c\009\00d\009\00e\009\00f\00a\000\00a\001\00a\002\00a\003\00a\004\00a\005\00a\006\00a\007\00a\008\00a\009\00a\00a\00a\00b\00a\00c\00a\00d\00a\00e\00a\00f\00b\000\00b\001\00b\002\00b\003\00b\004\00b\005\00b\006\00b\007\00b\008\00b\009\00b\00a\00b\00b\00b\00c\00b\00d\00b\00e\00b\00f\00c\000\00c\001\00c\002\00c\003\00c\004\00c\005\00c\006\00c\007\00c\008\00c\009\00c\00a\00c\00b\00c\00c\00c\00d\00c\00e\00c\00f\00d\000\00d\001\00d\002\00d\003\00d\004\00d\005\00d\006\00d\007\00d\008\00d\009\00d\00a\00d\00b\00d\00c\00d\00d\00d\00e\00d\00f\00e\000\00e\001\00e\002\00e\003\00e\004\00e\005\00e\006\00e\007\00e\008\00e\009\00e\00a\00e\00b\00e\00c\00e\00d\00e\00e\00e\00f\00f\000\00f\001\00f\002\00f\003\00f\004\00f\005\00f\006\00f\007\00f\008\00f\009\00f\00a\00f\00b\00f\00c\00f\00d\00f\00e\00f\00f")
 (data (i32.const 3804) "\\")
 (data (i32.const 3816) "\01\00\00\00H\00\00\000\001\002\003\004\005\006\007\008\009\00a\00b\00c\00d\00e\00f\00g\00h\00i\00j\00k\00l\00m\00n\00o\00p\00q\00r\00s\00t\00u\00v\00w\00x\00y\00z")
 (data (i32.const 3900) "<")
 (data (i32.const 3912) "\01\00\00\00$\00\00\00K\00e\00y\00 \00d\00o\00e\00s\00 \00n\00o\00t\00 \00e\00x\00i\00s\00t")
 (data (i32.const 3964) ",")
 (data (i32.const 3976) "\01\00\00\00\16\00\00\00~\00l\00i\00b\00/\00m\00a\00p\00.\00t\00s")
 (data (i32.const 4012) ",")
 (data (i32.const 4024) "\01\00\00\00\0e\00\00\00s\00p\00e\00n\00d\00e\00r")
 (data (i32.const 4060) "\1c")
 (data (i32.const 4072) "\01\00\00\00\n\00\00\00o\00w\00n\00e\00r")
 (data (i32.const 4092) "\1c")
 (data (i32.const 4104) "\01\00\00\00\04\00\00\00t\00o")
 (data (i32.const 4124) "\1c")
 (data (i32.const 4136) "\01\00\00\00\08\00\00\00N\00A\00M\00E")
 (data (i32.const 4156) "\1c")
 (data (i32.const 4168) "\01\00\00\00\0c\00\00\00S\00Y\00M\00B\00O\00L")
 (data (i32.const 4188) ",")
 (data (i32.const 4200) "\01\00\00\00\10\00\00\00D\00E\00C\00I\00M\00A\00L\00S")
 (data (i32.const 4236) ",")
 (data (i32.const 4248) "\01\00\00\00\18\00\00\00T\00O\00T\00A\00L\00_\00S\00U\00P\00P\00L\00Y")
 (data (i32.const 4284) "\1c")
 (data (i32.const 4296) "\01\00\00\00\06\00\00\00b\00a\00l")
 (data (i32.const 4316) "L")
 (data (i32.const 4328) "\01\00\00\008\00\00\00~\00l\00i\00b\00/\00a\00s\00-\00s\00t\00r\00i\00n\00g\00-\00s\00i\00n\00k\00/\00i\00n\00d\00e\00x\00.\00t\00s")
 (data (i32.const 4396) ",")
 (data (i32.const 4408) "\01\00\00\00\1c\00\00\00I\00n\00v\00a\00l\00i\00d\00 \00l\00e\00n\00g\00t\00h")
 (data (i32.const 4444) "<")
 (data (i32.const 4456) "\01\00\00\00&\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00b\00u\00f\00f\00e\00r\00.\00t\00s")
 (data (i32.const 4508) ",")
 (data (i32.const 4520) "\01\00\00\00\1a\00\00\00~\00l\00i\00b\00/\00a\00r\00r\00a\00y\00.\00t\00s")
 (data (i32.const 4556) "|")
 (data (i32.const 4568) "\01\00\00\00^\00\00\00E\00l\00e\00m\00e\00n\00t\00 \00t\00y\00p\00e\00 \00m\00u\00s\00t\00 \00b\00e\00 \00n\00u\00l\00l\00a\00b\00l\00e\00 \00i\00f\00 \00a\00r\00r\00a\00y\00 \00i\00s\00 \00h\00o\00l\00e\00y")
 (data (i32.const 4684) ",")
 (data (i32.const 4696) "\01\00\00\00\18\00\00\00t\00r\00a\00n\00s\00f\00e\00r\00i\00n\00g\00 ")
 (data (i32.const 4732) ",")
 (data (i32.const 4744) "\01\00\00\00\1a\00\00\00 \00t\00o\00k\00e\00n\00s\00 \00f\00r\00o\00m\00 ")
 (data (i32.const 4780) "\1c")
 (data (i32.const 4792) "\01\00\00\00\08\00\00\00 \00t\00o\00 ")
 (data (i32.const 4812) "<")
 (data (i32.const 4824) "\01\00\00\00(\00\00\00I\00N\00S\00U\00F\00F\00I\00C\00I\00E\00N\00T\00_\00B\00A\00L\00A\00N\00C\00E")
 (data (i32.const 4876) "<")
 (data (i32.const 4888) "\01\00\00\00\"\00\00\00a\00s\00s\00e\00m\00b\00l\00y\00/\00t\00o\00k\00e\00n\00.\00t\00s")
 (data (i32.const 4940) "\1c")
 (data (i32.const 4952) "\01\00\00\00\n\00\00\00a\00l\00l\00o\00w")
 (data (i32.const 4972) "<")
 (data (i32.const 4984) "\01\00\00\00$\00\00\00A\00L\00L\00O\00W\00A\00N\00C\00E\00_\00E\00X\00C\00E\00E\00D\00E\00D")
 (data (i32.const 5036) ",")
 (data (i32.const 5048) "\01\00\00\00\10\00\00\00m\00i\00n\00t\00i\00n\00g\00 ")
 (data (i32.const 5084) ",")
 (data (i32.const 5096) "\01\00\00\00\18\00\00\00 \00t\00o\00k\00e\00n\00s\00 \00f\00o\00r\00 ")
 (data (i32.const 5132) "<")
 (data (i32.const 5144) "\01\00\00\00 \00\00\00C\00u\00r\00r\00e\00n\00t\00 \00s\00u\00p\00p\00l\00y\00:\00 ")
 (data (i32.const 5196) ",")
 (data (i32.const 5208) "\01\00\00\00\18\00\00\00N\00e\00w\00 \00s\00u\00p\00p\00l\00y\00:\00 ")
 (data (i32.const 5244) "<")
 (data (i32.const 5256) "\01\00\00\00*\00\00\00O\00b\00j\00e\00c\00t\00 \00a\00l\00r\00e\00a\00d\00y\00 \00p\00i\00n\00n\00e\00d")
 (data (i32.const 5308) "<")
 (data (i32.const 5320) "\01\00\00\00(\00\00\00O\00b\00j\00e\00c\00t\00 \00i\00s\00 \00n\00o\00t\00 \00p\00i\00n\00n\00e\00d")
 (data (i32.const 5376) "\1a\00\00\00 \00\00\00\00\00\00\00 ")
 (data (i32.const 5420) "\10A\82\00\00\00\00\00\02A\00\00\00\00\00\00B\00\00\00\00\00\00\00B\00\00\00\00\00\00\00\82\00\00\00\00\00\00\00\02\01\00\00\00\00\00\00\02\02\00\00\00\00\00\00B\08\00\00\00\00\00\00\82\08\00\00\00\00\00\00\02\t\00\00\00\00\00\00\02\n\00\00\00\00\00\00\02\19\00\00\00\00\00\00\02\1a\00\00\00\00\00\00\02A")
 (data (i32.const 5540) "\10A\82")
 (export "MintArgs" (global $assembly/token/MintArgs))
 (export "AllowArgs" (global $assembly/token/AllowArgs))
 (export "AllowanceArgs" (global $assembly/token/AllowanceArgs))
 (export "TransferArgs" (global $assembly/token/TransferArgs))
 (export "TransferFromArgs" (global $assembly/token/TransferFromArgs))
 (export "name" (func $assembly/token/name))
 (export "symbol" (func $assembly/token/symbol))
 (export "decimals" (func $assembly/token/decimals))
 (export "totalSupply" (func $assembly/token/totalSupply))
 (export "__new" (func $~lib/rt/itcms/__new))
 (export "__pin" (func $~lib/rt/itcms/__pin))
 (export "__unpin" (func $~lib/rt/itcms/__unpin))
 (export "__collect" (func $~lib/rt/itcms/__collect))
 (export "__rtti_base" (global $~lib/rt/__rtti_base))
 (export "memory" (memory $0))
 (export "MintArgs#get:address" (func $export:assembly/token/MintArgs#get:address))
 (export "MintArgs#set:address" (func $export:assembly/token/MintArgs#set:address))
 (export "MintArgs#get:amount" (func $export:assembly/token/MintArgs#get:amount))
 (export "MintArgs#set:amount" (func $export:assembly/token/MintArgs#set:amount))
 (export "MintArgs#get:__encoded" (func $export:assembly/token/MintArgs#get:__encoded))
 (export "MintArgs#set:__encoded" (func $export:assembly/token/MintArgs#set:__encoded))
 (export "MintArgs#__encode" (func $export:assembly/token/MintArgs#__encode))
 (export "MintArgs#__decode" (func $export:assembly/token/MintArgs#__decode))
 (export "MintArgs#constructor" (func $export:assembly/token/MintArgs#constructor))
 (export "AllowArgs#get:spender" (func $export:assembly/token/MintArgs#get:address))
 (export "AllowArgs#set:spender" (func $export:assembly/token/MintArgs#set:address))
 (export "AllowArgs#get:amount" (func $export:assembly/token/MintArgs#get:amount))
 (export "AllowArgs#set:amount" (func $export:assembly/token/MintArgs#set:amount))
 (export "AllowArgs#get:__encoded" (func $export:assembly/token/MintArgs#get:__encoded))
 (export "AllowArgs#set:__encoded" (func $export:assembly/token/MintArgs#set:__encoded))
 (export "AllowArgs#__encode" (func $export:assembly/token/AllowArgs#__encode))
 (export "AllowArgs#__decode" (func $export:assembly/token/AllowArgs#__decode))
 (export "AllowArgs#constructor" (func $export:assembly/token/AllowArgs#constructor))
 (export "AllowanceArgs#get:owner" (func $export:assembly/token/MintArgs#get:address))
 (export "AllowanceArgs#set:owner" (func $export:assembly/token/MintArgs#set:address))
 (export "AllowanceArgs#get:spender" (func $export:assembly/token/MintArgs#get:amount))
 (export "AllowanceArgs#set:spender" (func $export:assembly/token/AllowanceArgs#set:spender))
 (export "AllowanceArgs#get:__encoded" (func $export:assembly/token/MintArgs#get:__encoded))
 (export "AllowanceArgs#set:__encoded" (func $export:assembly/token/MintArgs#set:__encoded))
 (export "AllowanceArgs#__encode" (func $export:assembly/token/AllowanceArgs#__encode))
 (export "AllowanceArgs#__decode" (func $export:assembly/token/AllowanceArgs#__decode))
 (export "AllowanceArgs#constructor" (func $export:assembly/token/AllowanceArgs#constructor))
 (export "TransferArgs#get:to" (func $export:assembly/token/MintArgs#get:address))
 (export "TransferArgs#set:to" (func $export:assembly/token/MintArgs#set:address))
 (export "TransferArgs#get:amount" (func $export:assembly/token/MintArgs#get:amount))
 (export "TransferArgs#set:amount" (func $export:assembly/token/MintArgs#set:amount))
 (export "TransferArgs#get:__encoded" (func $export:assembly/token/MintArgs#get:__encoded))
 (export "TransferArgs#set:__encoded" (func $export:assembly/token/MintArgs#set:__encoded))
 (export "TransferArgs#__encode" (func $export:assembly/token/TransferArgs#__encode))
 (export "TransferArgs#__decode" (func $export:assembly/token/TransferArgs#__decode))
 (export "TransferArgs#constructor" (func $export:assembly/token/TransferArgs#constructor))
 (export "TransferFromArgs#get:owner" (func $export:assembly/token/MintArgs#get:address))
 (export "TransferFromArgs#set:owner" (func $export:assembly/token/MintArgs#set:address))
 (export "TransferFromArgs#get:to" (func $export:assembly/token/MintArgs#get:amount))
 (export "TransferFromArgs#set:to" (func $export:assembly/token/AllowanceArgs#set:spender))
 (export "TransferFromArgs#get:amount" (func $export:assembly/token/MintArgs#get:__encoded))
 (export "TransferFromArgs#set:amount" (func $export:assembly/token/TransferFromArgs#set:amount))
 (export "TransferFromArgs#get:__encoded" (func $export:assembly/token/TransferFromArgs#get:__encoded))
 (export "TransferFromArgs#set:__encoded" (func $export:assembly/token/TransferFromArgs#set:__encoded))
 (export "TransferFromArgs#__encode" (func $export:assembly/token/TransferFromArgs#__encode))
 (export "TransferFromArgs#__decode" (func $export:assembly/token/TransferFromArgs#__decode))
 (export "TransferFromArgs#constructor" (func $export:assembly/token/TransferFromArgs#constructor))
 (export "balanceOf" (func $export:assembly/token/balanceOf))
 (export "transfer" (func $export:assembly/token/transfer))
 (export "allow" (func $export:assembly/token/allow))
 (export "allowance" (func $export:assembly/token/allowance))
 (export "transferFrom" (func $export:assembly/token/transferFrom))
 (export "mint" (func $export:assembly/token/mint))
 (start $~start)
 (func $~lib/rt/itcms/visitRoots
  (local $0 i32)
  (local $1 i32)
  i32.const 1664
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 4416
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 4576
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 3920
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 1472
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 5264
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 5328
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 2768
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 3824
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 1056
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 1088
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 1120
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 1152
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 1184
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 1216
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 1248
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 1280
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  i32.const 1312
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  global.get $~lib/json-as/index/unknownTrue
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
  global.get $~lib/json-as/index/unknownFalse
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
  global.get $~lib/json-as/index/unknownNull
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
  i32.const 1968
  call $byn-split-outlined-A$~lib/rt/itcms/__visit
  global.get $~lib/rt/itcms/pinSpace
  local.tee $1
  i32.load offset=4
  i32.const -4
  i32.and
  local.set $0
  loop $while-continue|0
   local.get $0
   local.get $1
   i32.ne
   if
    local.get $0
    i32.load offset=4
    i32.const 3
    i32.and
    i32.const 3
    i32.ne
    if
     i32.const 0
     i32.const 1536
     i32.const 159
     i32.const 16
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 20
    i32.add
    call $~lib/rt/__visit_members
    local.get $0
    i32.load offset=4
    i32.const -4
    i32.and
    local.set $0
    br $while-continue|0
   end
  end
 )
 (func $~lib/rt/itcms/Object#unlink (param $0 i32)
  (local $1 i32)
  local.get $0
  i32.load offset=4
  i32.const -4
  i32.and
  local.tee $1
  i32.eqz
  if
   i32.const 0
   local.get $0
   i32.const 21972
   i32.lt_u
   local.get $0
   i32.load offset=8
   select
   i32.eqz
   if
    i32.const 0
    i32.const 1536
    i32.const 127
    i32.const 18
    call $~lib/builtins/abort
    unreachable
   end
   return
  end
  local.get $0
  i32.load offset=8
  local.tee $0
  i32.eqz
  if
   i32.const 0
   i32.const 1536
   i32.const 131
   i32.const 16
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  local.get $0
  i32.store offset=8
  local.get $0
  local.get $0
  i32.load offset=4
  i32.const 3
  i32.and
  local.get $1
  i32.or
  i32.store offset=4
 )
 (func $~lib/rt/itcms/Object#makeGray (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/rt/itcms/iter
  local.get $0
  i32.eq
  if
   local.get $0
   i32.load offset=8
   local.tee $1
   i32.eqz
   if
    i32.const 0
    i32.const 1536
    i32.const 147
    i32.const 30
    call $~lib/builtins/abort
    unreachable
   end
   local.get $1
   global.set $~lib/rt/itcms/iter
  end
  local.get $0
  call $~lib/rt/itcms/Object#unlink
  global.get $~lib/rt/itcms/toSpace
  local.set $1
  local.get $0
  i32.load offset=12
  local.tee $2
  i32.const 1
  i32.le_u
  if (result i32)
   i32.const 1
  else
   i32.const 5376
   i32.load
   local.get $2
   i32.lt_u
   if
    i32.const 1664
    i32.const 1728
    i32.const 22
    i32.const 28
    call $~lib/builtins/abort
    unreachable
   end
   local.get $2
   i32.const 3
   i32.shl
   i32.const 5380
   i32.add
   i32.load
   i32.const 32
   i32.and
  end
  local.set $3
  local.get $1
  i32.load offset=8
  local.set $2
  local.get $0
  local.get $1
  global.get $~lib/rt/itcms/white
  i32.eqz
  i32.const 2
  local.get $3
  select
  i32.or
  i32.store offset=4
  local.get $0
  local.get $2
  i32.store offset=8
  local.get $2
  local.get $2
  i32.load offset=4
  i32.const 3
  i32.and
  local.get $0
  i32.or
  i32.store offset=4
  local.get $1
  local.get $0
  i32.store offset=8
 )
 (func $~lib/rt/tlsf/removeBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $1
  i32.load
  local.tee $2
  i32.const 1
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1808
   i32.const 268
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $2
  i32.const -4
  i32.and
  local.tee $2
  i32.const 12
  i32.lt_u
  if
   i32.const 0
   i32.const 1808
   i32.const 270
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $2
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $2
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   local.get $2
   i32.const 1073741820
   local.get $2
   i32.const 1073741820
   i32.lt_u
   select
   local.tee $2
   i32.clz
   i32.sub
   local.tee $4
   i32.const 7
   i32.sub
   local.set $3
   local.get $2
   local.get $4
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $2
  i32.const 16
  i32.lt_u
  local.get $3
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1808
   i32.const 284
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.load offset=8
  local.set $5
  local.get $1
  i32.load offset=4
  local.tee $4
  if
   local.get $4
   local.get $5
   i32.store offset=8
  end
  local.get $5
  if
   local.get $5
   local.get $4
   i32.store offset=4
  end
  local.get $2
  local.get $3
  i32.const 4
  i32.shl
  i32.add
  i32.const 2
  i32.shl
  local.get $0
  i32.add
  i32.load offset=96
  local.get $1
  i32.eq
  if
   local.get $2
   local.get $3
   i32.const 4
   i32.shl
   i32.add
   i32.const 2
   i32.shl
   local.get $0
   i32.add
   local.get $5
   i32.store offset=96
   local.get $5
   i32.eqz
   if
    local.get $3
    i32.const 2
    i32.shl
    local.get $0
    i32.add
    local.tee $1
    i32.load offset=4
    i32.const -2
    local.get $2
    i32.rotl
    i32.and
    local.set $2
    local.get $1
    local.get $2
    i32.store offset=4
    local.get $2
    i32.eqz
    if
     local.get $0
     local.get $0
     i32.load
     i32.const -2
     local.get $3
     i32.rotl
     i32.and
     i32.store
    end
   end
  end
 )
 (func $~lib/rt/tlsf/insertBlock (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $1
  i32.eqz
  if
   i32.const 0
   i32.const 1808
   i32.const 201
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.load
  local.tee $3
  i32.const 1
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1808
   i32.const 203
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 4
  i32.add
  local.get $1
  i32.load
  i32.const -4
  i32.and
  i32.add
  local.tee $4
  i32.load
  local.tee $2
  i32.const 1
  i32.and
  if
   local.get $0
   local.get $4
   call $~lib/rt/tlsf/removeBlock
   local.get $1
   local.get $3
   i32.const 4
   i32.add
   local.get $2
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   i32.store
   local.get $1
   i32.const 4
   i32.add
   local.get $1
   i32.load
   i32.const -4
   i32.and
   i32.add
   local.tee $4
   i32.load
   local.set $2
  end
  local.get $3
  i32.const 2
  i32.and
  if
   local.get $1
   i32.const 4
   i32.sub
   i32.load
   local.tee $1
   i32.load
   local.tee $6
   i32.const 1
   i32.and
   i32.eqz
   if
    i32.const 0
    i32.const 1808
    i32.const 221
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
   local.get $0
   local.get $1
   call $~lib/rt/tlsf/removeBlock
   local.get $1
   local.get $6
   i32.const 4
   i32.add
   local.get $3
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   i32.store
  end
  local.get $4
  local.get $2
  i32.const 2
  i32.or
  i32.store
  local.get $3
  i32.const -4
  i32.and
  local.tee $2
  i32.const 12
  i32.lt_u
  if
   i32.const 0
   i32.const 1808
   i32.const 233
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $2
  local.get $1
  i32.const 4
  i32.add
  i32.add
  local.get $4
  i32.ne
  if
   i32.const 0
   i32.const 1808
   i32.const 234
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $4
  i32.const 4
  i32.sub
  local.get $1
  i32.store
  local.get $2
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $2
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   local.get $2
   i32.const 1073741820
   local.get $2
   i32.const 1073741820
   i32.lt_u
   select
   local.tee $2
   i32.clz
   i32.sub
   local.tee $3
   i32.const 7
   i32.sub
   local.set $5
   local.get $2
   local.get $3
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $2
  i32.const 16
  i32.lt_u
  local.get $5
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1808
   i32.const 251
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $2
  local.get $5
  i32.const 4
  i32.shl
  i32.add
  i32.const 2
  i32.shl
  local.get $0
  i32.add
  i32.load offset=96
  local.set $3
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  local.get $3
  i32.store offset=8
  local.get $3
  if
   local.get $3
   local.get $1
   i32.store offset=4
  end
  local.get $2
  local.get $5
  i32.const 4
  i32.shl
  i32.add
  i32.const 2
  i32.shl
  local.get $0
  i32.add
  local.get $1
  i32.store offset=96
  local.get $0
  local.get $0
  i32.load
  i32.const 1
  local.get $5
  i32.shl
  i32.or
  i32.store
  local.get $5
  i32.const 2
  i32.shl
  local.get $0
  i32.add
  local.tee $0
  local.get $0
  i32.load offset=4
  i32.const 1
  local.get $2
  i32.shl
  i32.or
  i32.store offset=4
 )
 (func $~lib/rt/tlsf/addMemory (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  local.get $1
  local.get $2
  i32.gt_u
  if
   i32.const 0
   i32.const 1808
   i32.const 377
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  i32.const 19
  i32.add
  i32.const -16
  i32.and
  i32.const 4
  i32.sub
  local.set $1
  local.get $0
  i32.load offset=1568
  local.tee $4
  if
   local.get $1
   local.get $4
   i32.const 4
   i32.add
   i32.lt_u
   if
    i32.const 0
    i32.const 1808
    i32.const 384
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
   local.get $4
   local.get $1
   i32.const 16
   i32.sub
   i32.eq
   if
    local.get $4
    i32.load
    local.set $3
    local.get $1
    i32.const 16
    i32.sub
    local.set $1
   end
  else
   local.get $1
   local.get $0
   i32.const 1572
   i32.add
   i32.lt_u
   if
    i32.const 0
    i32.const 1808
    i32.const 397
    i32.const 5
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $2
  i32.const -16
  i32.and
  local.get $1
  i32.sub
  local.tee $2
  i32.const 20
  i32.lt_u
  if
   return
  end
  local.get $1
  local.get $3
  i32.const 2
  i32.and
  local.get $2
  i32.const 8
  i32.sub
  local.tee $2
  i32.const 1
  i32.or
  i32.or
  i32.store
  local.get $1
  i32.const 0
  i32.store offset=4
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $2
  local.get $1
  i32.const 4
  i32.add
  i32.add
  local.tee $2
  i32.const 2
  i32.store
  local.get $0
  local.get $2
  i32.store offset=1568
  local.get $0
  local.get $1
  call $~lib/rt/tlsf/insertBlock
 )
 (func $~lib/rt/tlsf/initialize
  (local $0 i32)
  (local $1 i32)
  memory.size
  local.tee $1
  i32.const 0
  i32.le_s
  if (result i32)
   i32.const 1
   local.get $1
   i32.sub
   memory.grow
   i32.const 0
   i32.lt_s
  else
   i32.const 0
  end
  if
   unreachable
  end
  i32.const 21984
  i32.const 0
  i32.store
  i32.const 23552
  i32.const 0
  i32.store
  loop $for-loop|0
   local.get $0
   i32.const 23
   i32.lt_u
   if
    local.get $0
    i32.const 2
    i32.shl
    i32.const 21984
    i32.add
    i32.const 0
    i32.store offset=4
    i32.const 0
    local.set $1
    loop $for-loop|1
     local.get $1
     i32.const 16
     i32.lt_u
     if
      local.get $1
      local.get $0
      i32.const 4
      i32.shl
      i32.add
      i32.const 2
      i32.shl
      i32.const 21984
      i32.add
      i32.const 0
      i32.store offset=96
      local.get $1
      i32.const 1
      i32.add
      local.set $1
      br $for-loop|1
     end
    end
    local.get $0
    i32.const 1
    i32.add
    local.set $0
    br $for-loop|0
   end
  end
  i32.const 21984
  i32.const 23556
  memory.size
  i32.const 16
  i32.shl
  call $~lib/rt/tlsf/addMemory
  i32.const 21984
  global.set $~lib/rt/tlsf/ROOT
 )
 (func $~lib/rt/itcms/step (result i32)
  (local $0 i32)
  (local $1 i32)
  (local $2 i32)
  block $break|0
   block $case2|0
    block $case1|0
     block $case0|0
      global.get $~lib/rt/itcms/state
      br_table $case0|0 $case1|0 $case2|0 $break|0
     end
     i32.const 1
     global.set $~lib/rt/itcms/state
     i32.const 0
     global.set $~lib/rt/itcms/visitCount
     call $~lib/rt/itcms/visitRoots
     global.get $~lib/rt/itcms/toSpace
     global.set $~lib/rt/itcms/iter
     global.get $~lib/rt/itcms/visitCount
     return
    end
    global.get $~lib/rt/itcms/white
    i32.eqz
    local.set $1
    global.get $~lib/rt/itcms/iter
    i32.load offset=4
    i32.const -4
    i32.and
    local.set $0
    loop $while-continue|1
     global.get $~lib/rt/itcms/toSpace
     local.get $0
     i32.ne
     if
      local.get $0
      global.set $~lib/rt/itcms/iter
      local.get $0
      i32.load offset=4
      i32.const 3
      i32.and
      local.get $1
      i32.ne
      if
       local.get $0
       local.get $1
       local.get $0
       i32.load offset=4
       i32.const -4
       i32.and
       i32.or
       i32.store offset=4
       i32.const 0
       global.set $~lib/rt/itcms/visitCount
       local.get $0
       i32.const 20
       i32.add
       call $~lib/rt/__visit_members
       global.get $~lib/rt/itcms/visitCount
       return
      end
      local.get $0
      i32.load offset=4
      i32.const -4
      i32.and
      local.set $0
      br $while-continue|1
     end
    end
    i32.const 0
    global.set $~lib/rt/itcms/visitCount
    call $~lib/rt/itcms/visitRoots
    global.get $~lib/rt/itcms/toSpace
    global.get $~lib/rt/itcms/iter
    i32.load offset=4
    i32.const -4
    i32.and
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     local.set $0
     loop $while-continue|0
      local.get $0
      i32.const 21972
      i32.lt_u
      if
       local.get $0
       i32.load
       local.tee $2
       if
        local.get $2
        call $byn-split-outlined-A$~lib/rt/itcms/__visit
       end
       local.get $0
       i32.const 4
       i32.add
       local.set $0
       br $while-continue|0
      end
     end
     global.get $~lib/rt/itcms/iter
     i32.load offset=4
     i32.const -4
     i32.and
     local.set $0
     loop $while-continue|2
      global.get $~lib/rt/itcms/toSpace
      local.get $0
      i32.ne
      if
       local.get $0
       i32.load offset=4
       i32.const 3
       i32.and
       local.get $1
       i32.ne
       if
        local.get $0
        local.get $1
        local.get $0
        i32.load offset=4
        i32.const -4
        i32.and
        i32.or
        i32.store offset=4
        local.get $0
        i32.const 20
        i32.add
        call $~lib/rt/__visit_members
       end
       local.get $0
       i32.load offset=4
       i32.const -4
       i32.and
       local.set $0
       br $while-continue|2
      end
     end
     global.get $~lib/rt/itcms/fromSpace
     local.set $0
     global.get $~lib/rt/itcms/toSpace
     global.set $~lib/rt/itcms/fromSpace
     local.get $0
     global.set $~lib/rt/itcms/toSpace
     local.get $1
     global.set $~lib/rt/itcms/white
     local.get $0
     i32.load offset=4
     i32.const -4
     i32.and
     global.set $~lib/rt/itcms/iter
     i32.const 2
     global.set $~lib/rt/itcms/state
    end
    global.get $~lib/rt/itcms/visitCount
    return
   end
   global.get $~lib/rt/itcms/iter
   local.tee $0
   global.get $~lib/rt/itcms/toSpace
   i32.ne
   if
    local.get $0
    i32.load offset=4
    local.tee $1
    i32.const -4
    i32.and
    global.set $~lib/rt/itcms/iter
    global.get $~lib/rt/itcms/white
    i32.eqz
    local.get $1
    i32.const 3
    i32.and
    i32.ne
    if
     i32.const 0
     i32.const 1536
     i32.const 228
     i32.const 20
     call $~lib/builtins/abort
     unreachable
    end
    local.get $0
    i32.const 21972
    i32.lt_u
    if
     local.get $0
     i32.const 0
     i32.store offset=4
     local.get $0
     i32.const 0
     i32.store offset=8
    else
     global.get $~lib/rt/itcms/total
     local.get $0
     i32.load
     i32.const -4
     i32.and
     i32.const 4
     i32.add
     i32.sub
     global.set $~lib/rt/itcms/total
     local.get $0
     i32.const 4
     i32.add
     local.tee $0
     i32.const 21972
     i32.ge_u
     if
      global.get $~lib/rt/tlsf/ROOT
      i32.eqz
      if
       call $~lib/rt/tlsf/initialize
      end
      global.get $~lib/rt/tlsf/ROOT
      local.get $0
      i32.const 4
      i32.sub
      local.set $2
      local.get $0
      i32.const 15
      i32.and
      i32.const 1
      local.get $0
      select
      if (result i32)
       i32.const 1
      else
       local.get $2
       i32.load
       i32.const 1
       i32.and
      end
      if
       i32.const 0
       i32.const 1808
       i32.const 559
       i32.const 3
       call $~lib/builtins/abort
       unreachable
      end
      local.get $2
      local.get $2
      i32.load
      i32.const 1
      i32.or
      i32.store
      local.get $2
      call $~lib/rt/tlsf/insertBlock
     end
    end
    i32.const 10
    return
   end
   global.get $~lib/rt/itcms/toSpace
   local.tee $0
   local.get $0
   i32.store offset=4
   local.get $0
   local.get $0
   i32.store offset=8
   i32.const 0
   global.set $~lib/rt/itcms/state
  end
  i32.const 0
 )
 (func $~lib/rt/tlsf/searchBlock (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $1
  i32.const 256
  i32.lt_u
  if (result i32)
   local.get $1
   i32.const 4
   i32.shr_u
  else
   i32.const 31
   i32.const 1
   i32.const 27
   local.get $1
   i32.clz
   i32.sub
   i32.shl
   local.get $1
   i32.add
   i32.const 1
   i32.sub
   local.get $1
   local.get $1
   i32.const 536870910
   i32.lt_u
   select
   local.tee $1
   i32.clz
   i32.sub
   local.tee $3
   i32.const 7
   i32.sub
   local.set $2
   local.get $1
   local.get $3
   i32.const 4
   i32.sub
   i32.shr_u
   i32.const 16
   i32.xor
  end
  local.tee $1
  i32.const 16
  i32.lt_u
  local.get $2
  i32.const 23
  i32.lt_u
  i32.and
  i32.eqz
  if
   i32.const 0
   i32.const 1808
   i32.const 330
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $2
  i32.const 2
  i32.shl
  local.get $0
  i32.add
  i32.load offset=4
  i32.const -1
  local.get $1
  i32.shl
  i32.and
  local.tee $1
  if (result i32)
   local.get $1
   i32.ctz
   local.get $2
   i32.const 4
   i32.shl
   i32.add
   i32.const 2
   i32.shl
   local.get $0
   i32.add
   i32.load offset=96
  else
   local.get $0
   i32.load
   i32.const -1
   local.get $2
   i32.const 1
   i32.add
   i32.shl
   i32.and
   local.tee $1
   if (result i32)
    local.get $1
    i32.ctz
    local.tee $1
    i32.const 2
    i32.shl
    local.get $0
    i32.add
    i32.load offset=4
    local.tee $2
    i32.eqz
    if
     i32.const 0
     i32.const 1808
     i32.const 343
     i32.const 18
     call $~lib/builtins/abort
     unreachable
    end
    local.get $2
    i32.ctz
    local.get $1
    i32.const 4
    i32.shl
    i32.add
    i32.const 2
    i32.shl
    local.get $0
    i32.add
    i32.load offset=96
   else
    i32.const 0
   end
  end
 )
 (func $~lib/rt/itcms/__new (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  local.get $0
  i32.const 1073741804
  i32.ge_u
  if
   i32.const 1472
   i32.const 1536
   i32.const 260
   i32.const 31
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/itcms/total
  global.get $~lib/rt/itcms/threshold
  i32.ge_u
  if
   block $__inlined_func$~lib/rt/itcms/interrupt
    i32.const 2048
    local.set $2
    loop $do-loop|0
     local.get $2
     call $~lib/rt/itcms/step
     i32.sub
     local.set $2
     global.get $~lib/rt/itcms/state
     i32.eqz
     if
      global.get $~lib/rt/itcms/total
      i64.extend_i32_u
      i64.const 200
      i64.mul
      i64.const 100
      i64.div_u
      i32.wrap_i64
      i32.const 1024
      i32.add
      global.set $~lib/rt/itcms/threshold
      br $__inlined_func$~lib/rt/itcms/interrupt
     end
     local.get $2
     i32.const 0
     i32.gt_s
     br_if $do-loop|0
    end
    global.get $~lib/rt/itcms/total
    local.tee $2
    local.get $2
    global.get $~lib/rt/itcms/threshold
    i32.sub
    i32.const 1024
    i32.lt_u
    i32.const 10
    i32.shl
    i32.add
    global.set $~lib/rt/itcms/threshold
   end
  end
  global.get $~lib/rt/tlsf/ROOT
  i32.eqz
  if
   call $~lib/rt/tlsf/initialize
  end
  global.get $~lib/rt/tlsf/ROOT
  local.set $5
  local.get $0
  i32.const 16
  i32.add
  local.tee $2
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 1472
   i32.const 1808
   i32.const 458
   i32.const 29
   call $~lib/builtins/abort
   unreachable
  end
  local.get $5
  i32.const 12
  local.get $2
  i32.const 19
  i32.add
  i32.const -16
  i32.and
  i32.const 4
  i32.sub
  local.get $2
  i32.const 12
  i32.le_u
  select
  local.tee $3
  call $~lib/rt/tlsf/searchBlock
  local.tee $2
  i32.eqz
  if
   memory.size
   local.tee $2
   i32.const 4
   local.get $5
   i32.load offset=1568
   local.get $2
   i32.const 16
   i32.shl
   i32.const 4
   i32.sub
   i32.ne
   i32.shl
   i32.const 1
   i32.const 27
   local.get $3
   i32.clz
   i32.sub
   i32.shl
   i32.const 1
   i32.sub
   local.get $3
   i32.add
   local.get $3
   local.get $3
   i32.const 536870910
   i32.lt_u
   select
   i32.add
   i32.const 65535
   i32.add
   i32.const -65536
   i32.and
   i32.const 16
   i32.shr_u
   local.tee $4
   local.get $2
   local.get $4
   i32.gt_s
   select
   memory.grow
   i32.const 0
   i32.lt_s
   if
    local.get $4
    memory.grow
    i32.const 0
    i32.lt_s
    if
     unreachable
    end
   end
   local.get $5
   local.get $2
   i32.const 16
   i32.shl
   memory.size
   i32.const 16
   i32.shl
   call $~lib/rt/tlsf/addMemory
   local.get $5
   local.get $3
   call $~lib/rt/tlsf/searchBlock
   local.tee $2
   i32.eqz
   if
    i32.const 0
    i32.const 1808
    i32.const 496
    i32.const 16
    call $~lib/builtins/abort
    unreachable
   end
  end
  local.get $2
  i32.load
  i32.const -4
  i32.and
  local.get $3
  i32.lt_u
  if
   i32.const 0
   i32.const 1808
   i32.const 498
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $5
  local.get $2
  call $~lib/rt/tlsf/removeBlock
  local.get $2
  i32.load
  local.set $6
  local.get $3
  i32.const 4
  i32.add
  i32.const 15
  i32.and
  if
   i32.const 0
   i32.const 1808
   i32.const 357
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  local.get $6
  i32.const -4
  i32.and
  local.get $3
  i32.sub
  local.tee $4
  i32.const 16
  i32.ge_u
  if
   local.get $2
   local.get $6
   i32.const 2
   i32.and
   local.get $3
   i32.or
   i32.store
   local.get $3
   local.get $2
   i32.const 4
   i32.add
   i32.add
   local.tee $3
   local.get $4
   i32.const 4
   i32.sub
   i32.const 1
   i32.or
   i32.store
   local.get $5
   local.get $3
   call $~lib/rt/tlsf/insertBlock
  else
   local.get $2
   local.get $6
   i32.const -2
   i32.and
   i32.store
   local.get $2
   i32.const 4
   i32.add
   local.get $2
   i32.load
   i32.const -4
   i32.and
   i32.add
   local.tee $3
   local.get $3
   i32.load
   i32.const -3
   i32.and
   i32.store
  end
  local.get $2
  local.get $1
  i32.store offset=12
  local.get $2
  local.get $0
  i32.store offset=16
  global.get $~lib/rt/itcms/fromSpace
  local.tee $1
  i32.load offset=8
  local.set $3
  local.get $2
  global.get $~lib/rt/itcms/white
  local.get $1
  i32.or
  i32.store offset=4
  local.get $2
  local.get $3
  i32.store offset=8
  local.get $3
  local.get $3
  i32.load offset=4
  i32.const 3
  i32.and
  local.get $2
  i32.or
  i32.store offset=4
  local.get $1
  local.get $2
  i32.store offset=8
  global.get $~lib/rt/itcms/total
  local.get $2
  i32.load
  i32.const -4
  i32.and
  i32.const 4
  i32.add
  i32.add
  global.set $~lib/rt/itcms/total
  local.get $2
  i32.const 20
  i32.add
  local.tee $2
  local.set $1
  block $~lib/util/memory/memset|inlined.0
   local.get $0
   i32.eqz
   br_if $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.const 0
   i32.store8
   local.get $0
   local.get $1
   i32.add
   local.tee $3
   i32.const 1
   i32.sub
   i32.const 0
   i32.store8
   local.get $0
   i32.const 2
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.const 0
   i32.store8 offset=1
   local.get $1
   i32.const 0
   i32.store8 offset=2
   local.get $3
   i32.const 2
   i32.sub
   i32.const 0
   i32.store8
   local.get $3
   i32.const 3
   i32.sub
   i32.const 0
   i32.store8
   local.get $0
   i32.const 6
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.const 0
   i32.store8 offset=3
   local.get $3
   i32.const 4
   i32.sub
   i32.const 0
   i32.store8
   local.get $0
   i32.const 8
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.const 0
   local.get $1
   i32.sub
   i32.const 3
   i32.and
   local.tee $3
   i32.add
   local.tee $1
   i32.const 0
   i32.store
   local.get $1
   local.get $0
   local.get $3
   i32.sub
   i32.const -4
   i32.and
   local.tee $0
   i32.add
   local.tee $3
   i32.const 4
   i32.sub
   i32.const 0
   i32.store
   local.get $0
   i32.const 8
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.const 0
   i32.store offset=4
   local.get $1
   i32.const 0
   i32.store offset=8
   local.get $3
   i32.const 12
   i32.sub
   i32.const 0
   i32.store
   local.get $3
   i32.const 8
   i32.sub
   i32.const 0
   i32.store
   local.get $0
   i32.const 24
   i32.le_u
   br_if $~lib/util/memory/memset|inlined.0
   local.get $1
   i32.const 0
   i32.store offset=12
   local.get $1
   i32.const 0
   i32.store offset=16
   local.get $1
   i32.const 0
   i32.store offset=20
   local.get $1
   i32.const 0
   i32.store offset=24
   local.get $3
   i32.const 28
   i32.sub
   i32.const 0
   i32.store
   local.get $3
   i32.const 24
   i32.sub
   i32.const 0
   i32.store
   local.get $3
   i32.const 20
   i32.sub
   i32.const 0
   i32.store
   local.get $3
   i32.const 16
   i32.sub
   i32.const 0
   i32.store
   local.get $1
   local.get $1
   i32.const 4
   i32.and
   i32.const 24
   i32.add
   local.tee $3
   i32.add
   local.set $1
   local.get $0
   local.get $3
   i32.sub
   local.set $0
   loop $while-continue|0
    local.get $0
    i32.const 32
    i32.ge_u
    if
     local.get $1
     i64.const 0
     i64.store
     local.get $1
     i64.const 0
     i64.store offset=8
     local.get $1
     i64.const 0
     i64.store offset=16
     local.get $1
     i64.const 0
     i64.store offset=24
     local.get $0
     i32.const 32
     i32.sub
     local.set $0
     local.get $1
     i32.const 32
     i32.add
     local.set $1
     br $while-continue|0
    end
   end
  end
  local.get $2
 )
 (func $~lib/util/memory/memcpy (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  loop $while-continue|0
   local.get $1
   i32.const 3
   i32.and
   i32.const 0
   local.get $2
   select
   if
    local.get $0
    local.tee $3
    i32.const 1
    i32.add
    local.set $0
    local.get $1
    local.tee $4
    i32.const 1
    i32.add
    local.set $1
    local.get $3
    local.get $4
    i32.load8_u
    i32.store8
    local.get $2
    i32.const 1
    i32.sub
    local.set $2
    br $while-continue|0
   end
  end
  local.get $0
  i32.const 3
  i32.and
  i32.eqz
  if
   loop $while-continue|1
    local.get $2
    i32.const 16
    i32.ge_u
    if
     local.get $0
     local.get $1
     i32.load
     i32.store
     local.get $0
     local.get $1
     i32.load offset=4
     i32.store offset=4
     local.get $0
     local.get $1
     i32.load offset=8
     i32.store offset=8
     local.get $0
     local.get $1
     i32.load offset=12
     i32.store offset=12
     local.get $1
     i32.const 16
     i32.add
     local.set $1
     local.get $0
     i32.const 16
     i32.add
     local.set $0
     local.get $2
     i32.const 16
     i32.sub
     local.set $2
     br $while-continue|1
    end
   end
   local.get $2
   i32.const 8
   i32.and
   if
    local.get $0
    local.get $1
    i32.load
    i32.store
    local.get $0
    local.get $1
    i32.load offset=4
    i32.store offset=4
    local.get $1
    i32.const 8
    i32.add
    local.set $1
    local.get $0
    i32.const 8
    i32.add
    local.set $0
   end
   local.get $2
   i32.const 4
   i32.and
   if
    local.get $0
    local.get $1
    i32.load
    i32.store
    local.get $1
    i32.const 4
    i32.add
    local.set $1
    local.get $0
    i32.const 4
    i32.add
    local.set $0
   end
   local.get $2
   i32.const 2
   i32.and
   if
    local.get $0
    local.get $1
    i32.load16_u
    i32.store16
    local.get $1
    i32.const 2
    i32.add
    local.set $1
    local.get $0
    i32.const 2
    i32.add
    local.set $0
   end
   local.get $2
   i32.const 1
   i32.and
   if
    local.get $0
    local.get $1
    i32.load8_u
    i32.store8
   end
   return
  end
  local.get $2
  i32.const 32
  i32.ge_u
  if
   block $break|2
    block $case2|2
     block $case1|2
      block $case0|2
       local.get $0
       i32.const 3
       i32.and
       i32.const 1
       i32.sub
       br_table $case0|2 $case1|2 $case2|2 $break|2
      end
      local.get $1
      i32.load
      local.set $5
      local.get $0
      local.get $1
      i32.load8_u
      i32.store8
      local.get $0
      local.get $1
      i32.load8_u offset=1
      i32.store8 offset=1
      local.get $0
      i32.const 2
      i32.add
      local.tee $3
      i32.const 1
      i32.add
      local.set $0
      local.get $1
      i32.const 2
      i32.add
      local.tee $4
      i32.const 1
      i32.add
      local.set $1
      local.get $3
      local.get $4
      i32.load8_u
      i32.store8
      local.get $2
      i32.const 3
      i32.sub
      local.set $2
      loop $while-continue|3
       local.get $2
       i32.const 17
       i32.ge_u
       if
        local.get $0
        local.get $1
        i32.load offset=1
        local.tee $3
        i32.const 8
        i32.shl
        local.get $5
        i32.const 24
        i32.shr_u
        i32.or
        i32.store
        local.get $0
        local.get $1
        i32.load offset=5
        local.tee $4
        i32.const 8
        i32.shl
        local.get $3
        i32.const 24
        i32.shr_u
        i32.or
        i32.store offset=4
        local.get $0
        local.get $1
        i32.load offset=9
        local.tee $3
        i32.const 8
        i32.shl
        local.get $4
        i32.const 24
        i32.shr_u
        i32.or
        i32.store offset=8
        local.get $0
        local.get $1
        i32.load offset=13
        local.tee $5
        i32.const 8
        i32.shl
        local.get $3
        i32.const 24
        i32.shr_u
        i32.or
        i32.store offset=12
        local.get $1
        i32.const 16
        i32.add
        local.set $1
        local.get $0
        i32.const 16
        i32.add
        local.set $0
        local.get $2
        i32.const 16
        i32.sub
        local.set $2
        br $while-continue|3
       end
      end
      br $break|2
     end
     local.get $1
     i32.load
     local.set $5
     local.get $0
     local.get $1
     i32.load8_u
     i32.store8
     local.get $0
     local.tee $3
     i32.const 2
     i32.add
     local.set $0
     local.get $1
     local.tee $4
     i32.const 2
     i32.add
     local.set $1
     local.get $3
     local.get $4
     i32.load8_u offset=1
     i32.store8 offset=1
     local.get $2
     i32.const 2
     i32.sub
     local.set $2
     loop $while-continue|4
      local.get $2
      i32.const 18
      i32.ge_u
      if
       local.get $0
       local.get $1
       i32.load offset=2
       local.tee $3
       i32.const 16
       i32.shl
       local.get $5
       i32.const 16
       i32.shr_u
       i32.or
       i32.store
       local.get $0
       local.get $1
       i32.load offset=6
       local.tee $4
       i32.const 16
       i32.shl
       local.get $3
       i32.const 16
       i32.shr_u
       i32.or
       i32.store offset=4
       local.get $0
       local.get $1
       i32.load offset=10
       local.tee $3
       i32.const 16
       i32.shl
       local.get $4
       i32.const 16
       i32.shr_u
       i32.or
       i32.store offset=8
       local.get $0
       local.get $1
       i32.load offset=14
       local.tee $5
       i32.const 16
       i32.shl
       local.get $3
       i32.const 16
       i32.shr_u
       i32.or
       i32.store offset=12
       local.get $1
       i32.const 16
       i32.add
       local.set $1
       local.get $0
       i32.const 16
       i32.add
       local.set $0
       local.get $2
       i32.const 16
       i32.sub
       local.set $2
       br $while-continue|4
      end
     end
     br $break|2
    end
    local.get $1
    i32.load
    local.set $5
    local.get $0
    local.tee $3
    i32.const 1
    i32.add
    local.set $0
    local.get $1
    local.tee $4
    i32.const 1
    i32.add
    local.set $1
    local.get $3
    local.get $4
    i32.load8_u
    i32.store8
    local.get $2
    i32.const 1
    i32.sub
    local.set $2
    loop $while-continue|5
     local.get $2
     i32.const 19
     i32.ge_u
     if
      local.get $0
      local.get $1
      i32.load offset=3
      local.tee $3
      i32.const 24
      i32.shl
      local.get $5
      i32.const 8
      i32.shr_u
      i32.or
      i32.store
      local.get $0
      local.get $1
      i32.load offset=7
      local.tee $4
      i32.const 24
      i32.shl
      local.get $3
      i32.const 8
      i32.shr_u
      i32.or
      i32.store offset=4
      local.get $0
      local.get $1
      i32.load offset=11
      local.tee $3
      i32.const 24
      i32.shl
      local.get $4
      i32.const 8
      i32.shr_u
      i32.or
      i32.store offset=8
      local.get $0
      local.get $1
      i32.load offset=15
      local.tee $5
      i32.const 24
      i32.shl
      local.get $3
      i32.const 8
      i32.shr_u
      i32.or
      i32.store offset=12
      local.get $1
      i32.const 16
      i32.add
      local.set $1
      local.get $0
      i32.const 16
      i32.add
      local.set $0
      local.get $2
      i32.const 16
      i32.sub
      local.set $2
      br $while-continue|5
     end
    end
   end
  end
  local.get $2
  i32.const 16
  i32.and
  if
   local.get $0
   local.get $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $3
   i32.load8_u
   i32.store8
   local.get $3
   i32.const 2
   i32.add
   local.set $1
   local.get $0
   local.get $3
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.set $0
  end
  local.get $2
  i32.const 8
  i32.and
  if
   local.get $0
   local.get $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $3
   i32.load8_u
   i32.store8
   local.get $3
   i32.const 2
   i32.add
   local.set $1
   local.get $0
   local.get $3
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.set $0
  end
  local.get $2
  i32.const 4
  i32.and
  if
   local.get $0
   local.get $1
   i32.load8_u
   i32.store8
   local.get $0
   local.get $1
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   local.get $1
   i32.const 2
   i32.add
   local.tee $3
   i32.load8_u
   i32.store8
   local.get $3
   i32.const 2
   i32.add
   local.set $1
   local.get $0
   local.get $3
   i32.load8_u offset=1
   i32.store8 offset=1
   local.get $0
   i32.const 2
   i32.add
   local.set $0
  end
  local.get $2
  i32.const 2
  i32.and
  if
   local.get $0
   local.get $1
   i32.load8_u
   i32.store8
   local.get $0
   local.tee $3
   i32.const 2
   i32.add
   local.set $0
   local.get $1
   local.tee $4
   i32.const 2
   i32.add
   local.set $1
   local.get $3
   local.get $4
   i32.load8_u offset=1
   i32.store8 offset=1
  end
  local.get $2
  i32.const 1
  i32.and
  if
   local.get $0
   local.get $1
   i32.load8_u
   i32.store8
  end
 )
 (func $~lib/memory/memory.copy (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  block $~lib/util/memory/memmove|inlined.0
   local.get $2
   local.set $4
   local.get $0
   local.get $1
   i32.eq
   br_if $~lib/util/memory/memmove|inlined.0
   local.get $1
   local.get $0
   i32.sub
   local.get $4
   i32.sub
   i32.const 0
   local.get $4
   i32.const 1
   i32.shl
   i32.sub
   i32.le_u
   if
    local.get $0
    local.get $1
    local.get $4
    call $~lib/util/memory/memcpy
    br $~lib/util/memory/memmove|inlined.0
   end
   local.get $0
   local.get $1
   i32.lt_u
   if
    local.get $1
    i32.const 7
    i32.and
    local.get $0
    i32.const 7
    i32.and
    i32.eq
    if
     loop $while-continue|0
      local.get $0
      i32.const 7
      i32.and
      if
       local.get $4
       i32.eqz
       br_if $~lib/util/memory/memmove|inlined.0
       local.get $4
       i32.const 1
       i32.sub
       local.set $4
       local.get $0
       local.tee $2
       i32.const 1
       i32.add
       local.set $0
       local.get $1
       local.tee $3
       i32.const 1
       i32.add
       local.set $1
       local.get $2
       local.get $3
       i32.load8_u
       i32.store8
       br $while-continue|0
      end
     end
     loop $while-continue|1
      local.get $4
      i32.const 8
      i32.ge_u
      if
       local.get $0
       local.get $1
       i64.load
       i64.store
       local.get $4
       i32.const 8
       i32.sub
       local.set $4
       local.get $0
       i32.const 8
       i32.add
       local.set $0
       local.get $1
       i32.const 8
       i32.add
       local.set $1
       br $while-continue|1
      end
     end
    end
    loop $while-continue|2
     local.get $4
     if
      local.get $0
      local.tee $2
      i32.const 1
      i32.add
      local.set $0
      local.get $1
      local.tee $3
      i32.const 1
      i32.add
      local.set $1
      local.get $2
      local.get $3
      i32.load8_u
      i32.store8
      local.get $4
      i32.const 1
      i32.sub
      local.set $4
      br $while-continue|2
     end
    end
   else
    local.get $1
    i32.const 7
    i32.and
    local.get $0
    i32.const 7
    i32.and
    i32.eq
    if
     loop $while-continue|3
      local.get $0
      local.get $4
      i32.add
      i32.const 7
      i32.and
      if
       local.get $4
       i32.eqz
       br_if $~lib/util/memory/memmove|inlined.0
       local.get $4
       i32.const 1
       i32.sub
       local.tee $4
       local.get $0
       i32.add
       local.get $1
       local.get $4
       i32.add
       i32.load8_u
       i32.store8
       br $while-continue|3
      end
     end
     loop $while-continue|4
      local.get $4
      i32.const 8
      i32.ge_u
      if
       local.get $4
       i32.const 8
       i32.sub
       local.tee $4
       local.get $0
       i32.add
       local.get $1
       local.get $4
       i32.add
       i64.load
       i64.store
       br $while-continue|4
      end
     end
    end
    loop $while-continue|5
     local.get $4
     if
      local.get $4
      i32.const 1
      i32.sub
      local.tee $4
      local.get $0
      i32.add
      local.get $1
      local.get $4
      i32.add
      i32.load8_u
      i32.store8
      br $while-continue|5
     end
    end
   end
  end
 )
 (func $~lib/string/String.__concat (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $__inlined_func$~lib/string/String#concat
   local.get $0
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
   i32.const 1
   i32.shl
   local.tee $3
   local.get $1
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
   i32.const 1
   i32.shl
   local.tee $4
   i32.add
   local.tee $2
   i32.eqz
   if
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const 1872
    local.set $2
    br $__inlined_func$~lib/string/String#concat
   end
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.const 1
   call $~lib/rt/itcms/__new
   local.tee $2
   i32.store
   local.get $2
   local.get $0
   local.get $3
   call $~lib/memory/memory.copy
   local.get $2
   local.get $3
   i32.add
   local.get $1
   local.get $4
   call $~lib/memory/memory.copy
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
  end
  local.get $2
 )
 (func $~lib/util/string/compareImpl (param $0 i32) (param $1 i32) (param $2 i32) (param $3 i32) (result i32)
  (local $4 i32)
  local.get $1
  i32.const 1
  i32.shl
  local.get $0
  i32.add
  local.tee $1
  i32.const 7
  i32.and
  local.get $2
  i32.const 7
  i32.and
  i32.or
  i32.eqz
  local.get $3
  i32.const 4
  i32.ge_u
  i32.and
  if
   loop $do-loop|0
    local.get $1
    i64.load
    local.get $2
    i64.load
    i64.eq
    if
     local.get $1
     i32.const 8
     i32.add
     local.set $1
     local.get $2
     i32.const 8
     i32.add
     local.set $2
     local.get $3
     i32.const 4
     i32.sub
     local.tee $3
     i32.const 4
     i32.ge_u
     br_if $do-loop|0
    end
   end
  end
  loop $while-continue|1
   local.get $3
   local.tee $0
   i32.const 1
   i32.sub
   local.set $3
   local.get $0
   if
    local.get $1
    i32.load16_u
    local.tee $0
    local.get $2
    i32.load16_u
    local.tee $4
    i32.ne
    if
     local.get $0
     local.get $4
     i32.sub
     return
    end
    local.get $1
    i32.const 2
    i32.add
    local.set $1
    local.get $2
    i32.const 2
    i32.add
    local.set $2
    br $while-continue|1
   end
  end
  i32.const 0
 )
 (func $~lib/string/String.__eq (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  local.get $0
  local.get $1
  i32.eq
  if
   i32.const 1
   return
  end
  local.get $1
  i32.const 0
  local.get $0
  select
  i32.eqz
  if
   i32.const 0
   return
  end
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  local.tee $2
  local.get $1
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  i32.ne
  if
   i32.const 0
   return
  end
  local.get $0
  i32.const 0
  local.get $1
  local.get $2
  call $~lib/util/string/compareImpl
  i32.eqz
 )
 (func $~lib/string/String#indexOf (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  local.get $1
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  local.tee $3
  i32.eqz
  if
   i32.const 0
   return
  end
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  local.tee $4
  i32.eqz
  if
   i32.const -1
   return
  end
  local.get $2
  i32.const 0
  local.get $2
  i32.const 0
  i32.gt_s
  select
  local.tee $2
  local.get $4
  local.get $2
  local.get $4
  i32.lt_s
  select
  local.set $2
  local.get $4
  local.get $3
  i32.sub
  local.set $4
  loop $for-loop|0
   local.get $2
   local.get $4
   i32.le_s
   if
    local.get $0
    local.get $2
    local.get $1
    local.get $3
    call $~lib/util/string/compareImpl
    i32.eqz
    if
     local.get $2
     return
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  i32.const -1
 )
 (func $~lib/rt/itcms/__renew (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  i32.const 20
  i32.sub
  local.tee $3
  i32.load
  i32.const -4
  i32.and
  i32.const 16
  i32.sub
  local.get $1
  i32.ge_u
  if
   local.get $3
   local.get $1
   i32.store offset=16
   local.get $0
   return
  end
  local.get $1
  local.get $3
  i32.load offset=12
  call $~lib/rt/itcms/__new
  local.tee $2
  local.get $0
  local.get $1
  local.get $3
  i32.load offset=16
  local.tee $0
  local.get $0
  local.get $1
  i32.gt_u
  select
  call $~lib/memory/memory.copy
  local.get $2
 )
 (func $~lib/json-as/index/JSON.stringify<~lib/string/String> (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  i64.const 0
  i64.store offset=8
  local.get $1
  i64.const 0
  i64.store offset=16
  local.get $1
  i32.const 1056
  i32.store offset=8
  local.get $1
  i32.const 1056
  i32.store offset=16
  local.get $1
  i32.const 1312
  i32.store offset=20
  local.get $0
  i32.const 1056
  i32.const 1312
  call $~lib/string/String#replaceAll
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=12
  i32.const 1056
  local.get $0
  call $~lib/string/String.__concat
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 1056
  i32.store offset=4
  local.get $0
  i32.const 1056
  call $~lib/string/String.__concat
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/number/U32#toString (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  block $__inlined_func$~lib/util/number/utoa32
   local.get $0
   i32.eqz
   if
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    i32.const 2336
    local.set $1
    br $__inlined_func$~lib/util/number/utoa32
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.const 100000
   i32.lt_u
   if (result i32)
    local.get $0
    i32.const 100
    i32.lt_u
    if (result i32)
     local.get $0
     i32.const 10
     i32.ge_u
     i32.const 1
     i32.add
    else
     local.get $0
     i32.const 10000
     i32.ge_u
     i32.const 3
     i32.add
     local.get $0
     i32.const 1000
     i32.ge_u
     i32.add
    end
   else
    local.get $0
    i32.const 10000000
    i32.lt_u
    if (result i32)
     local.get $0
     i32.const 1000000
     i32.ge_u
     i32.const 6
     i32.add
    else
     local.get $0
     i32.const 1000000000
     i32.ge_u
     i32.const 8
     i32.add
     local.get $0
     i32.const 100000000
     i32.ge_u
     i32.add
    end
   end
   local.tee $2
   i32.const 1
   i32.shl
   i32.const 1
   call $~lib/rt/itcms/__new
   local.tee $1
   i32.store
   loop $while-continue|0
    local.get $0
    i32.const 10000
    i32.ge_u
    if
     local.get $0
     i32.const 10000
     i32.rem_u
     local.set $3
     local.get $0
     i32.const 10000
     i32.div_u
     local.set $0
     local.get $2
     i32.const 4
     i32.sub
     local.tee $2
     i32.const 1
     i32.shl
     local.get $1
     i32.add
     local.get $3
     i32.const 100
     i32.div_u
     i32.const 2
     i32.shl
     i32.const 2348
     i32.add
     i64.load32_u
     local.get $3
     i32.const 100
     i32.rem_u
     i32.const 2
     i32.shl
     i32.const 2348
     i32.add
     i64.load32_u
     i64.const 32
     i64.shl
     i64.or
     i64.store
     br $while-continue|0
    end
   end
   local.get $0
   i32.const 100
   i32.ge_u
   if
    local.get $2
    i32.const 2
    i32.sub
    local.tee $2
    i32.const 1
    i32.shl
    local.get $1
    i32.add
    local.get $0
    i32.const 100
    i32.rem_u
    i32.const 2
    i32.shl
    i32.const 2348
    i32.add
    i32.load
    i32.store
    local.get $0
    i32.const 100
    i32.div_u
    local.set $0
   end
   local.get $0
   i32.const 10
   i32.ge_u
   if
    local.get $2
    i32.const 2
    i32.sub
    i32.const 1
    i32.shl
    local.get $1
    i32.add
    local.get $0
    i32.const 2
    i32.shl
    i32.const 2348
    i32.add
    i32.load
    i32.store
   else
    local.get $2
    i32.const 1
    i32.sub
    i32.const 1
    i32.shl
    local.get $1
    i32.add
    local.get $0
    i32.const 48
    i32.add
    i32.store16
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
  end
  local.get $1
 )
 (func $~lib/util/hash/HASH<~lib/string/String> (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  local.get $0
  if (result i32)
   local.get $0
   local.tee $1
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
   i32.const 1
   i32.shl
   local.tee $3
   i32.const 16
   i32.ge_u
   if (result i32)
    i32.const 606290984
    local.set $2
    i32.const -2048144777
    local.set $4
    i32.const 1640531535
    local.set $5
    local.get $1
    local.get $3
    i32.add
    i32.const 16
    i32.sub
    local.set $7
    loop $while-continue|0
     local.get $1
     local.get $7
     i32.le_u
     if
      local.get $1
      i32.load
      i32.const -2048144777
      i32.mul
      local.get $2
      i32.add
      i32.const 13
      i32.rotl
      i32.const -1640531535
      i32.mul
      local.set $2
      local.get $1
      i32.load offset=4
      i32.const -2048144777
      i32.mul
      local.get $4
      i32.add
      i32.const 13
      i32.rotl
      i32.const -1640531535
      i32.mul
      local.set $4
      local.get $1
      i32.load offset=8
      i32.const -2048144777
      i32.mul
      local.get $6
      i32.add
      i32.const 13
      i32.rotl
      i32.const -1640531535
      i32.mul
      local.set $6
      local.get $1
      i32.load offset=12
      i32.const -2048144777
      i32.mul
      local.get $5
      i32.add
      i32.const 13
      i32.rotl
      i32.const -1640531535
      i32.mul
      local.set $5
      local.get $1
      i32.const 16
      i32.add
      local.set $1
      br $while-continue|0
     end
    end
    local.get $2
    i32.const 1
    i32.rotl
    local.get $4
    i32.const 7
    i32.rotl
    i32.add
    local.get $6
    i32.const 12
    i32.rotl
    i32.add
    local.get $5
    i32.const 18
    i32.rotl
    i32.add
    local.get $3
    i32.add
   else
    local.get $3
    i32.const 374761393
    i32.add
   end
   local.set $2
   local.get $0
   local.get $3
   i32.add
   i32.const 4
   i32.sub
   local.set $4
   loop $while-continue|1
    local.get $1
    local.get $4
    i32.le_u
    if
     local.get $1
     i32.load
     i32.const -1028477379
     i32.mul
     local.get $2
     i32.add
     i32.const 17
     i32.rotl
     i32.const 668265263
     i32.mul
     local.set $2
     local.get $1
     i32.const 4
     i32.add
     local.set $1
     br $while-continue|1
    end
   end
   local.get $0
   local.get $3
   i32.add
   local.set $0
   loop $while-continue|2
    local.get $0
    local.get $1
    i32.gt_u
    if
     local.get $1
     i32.load8_u
     i32.const 374761393
     i32.mul
     local.get $2
     i32.add
     i32.const 11
     i32.rotl
     i32.const -1640531535
     i32.mul
     local.set $2
     local.get $1
     i32.const 1
     i32.add
     local.set $1
     br $while-continue|2
    end
   end
   local.get $2
   i32.const 15
   i32.shr_u
   local.get $2
   i32.xor
   i32.const -2048144777
   i32.mul
   local.tee $0
   i32.const 13
   i32.shr_u
   local.get $0
   i32.xor
   i32.const -1028477379
   i32.mul
   local.tee $0
   i32.const 16
   i32.shr_u
   local.get $0
   i32.xor
  else
   i32.const 0
  end
 )
 (func $~lib/map/Map<~lib/string/String,~lib/string/String>#get (param $0 i32) (param $1 i32) (result i32)
  local.get $0
  local.get $1
  local.get $1
  call $~lib/util/hash/HASH<~lib/string/String>
  call $~lib/map/Map<~lib/string/String,~lib/string/String>#find
  local.tee $0
  i32.eqz
  if
   i32.const 3920
   i32.const 3984
   i32.const 105
   i32.const 17
   call $~lib/builtins/abort
   unreachable
  end
  local.get $0
  i32.load offset=4
 )
 (func $~lib/util/string/strtol<i32> (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  local.tee $1
  i32.eqz
  if
   i32.const 0
   return
  end
  local.get $0
  i32.load16_u
  local.set $2
  loop $while-continue|0
   block $__inlined_func$~lib/util/string/isSpace (result i32)
    local.get $2
    i32.const 128
    i32.or
    i32.const 160
    i32.eq
    local.get $2
    i32.const 9
    i32.sub
    i32.const 4
    i32.le_u
    i32.or
    local.get $2
    i32.const 5760
    i32.lt_u
    br_if $__inlined_func$~lib/util/string/isSpace
    drop
    i32.const 1
    local.get $2
    i32.const -8192
    i32.add
    i32.const 10
    i32.le_u
    br_if $__inlined_func$~lib/util/string/isSpace
    drop
    block $break|0
     block $case6|0
      local.get $2
      i32.const 5760
      i32.eq
      br_if $case6|0
      local.get $2
      i32.const 8232
      i32.eq
      br_if $case6|0
      local.get $2
      i32.const 8233
      i32.eq
      br_if $case6|0
      local.get $2
      i32.const 8239
      i32.eq
      br_if $case6|0
      local.get $2
      i32.const 8287
      i32.eq
      br_if $case6|0
      local.get $2
      i32.const 12288
      i32.eq
      br_if $case6|0
      local.get $2
      i32.const 65279
      i32.eq
      br_if $case6|0
      br $break|0
     end
     i32.const 1
     br $__inlined_func$~lib/util/string/isSpace
    end
    i32.const 0
   end
   if
    local.get $0
    i32.const 2
    i32.add
    local.tee $0
    i32.load16_u
    local.set $2
    local.get $1
    i32.const 1
    i32.sub
    local.set $1
    br $while-continue|0
   end
  end
  i32.const 1
  local.set $3
  local.get $2
  i32.const 43
  i32.eq
  local.get $2
  i32.const 45
  i32.eq
  i32.or
  if (result i32)
   local.get $1
   i32.const 1
   i32.sub
   local.tee $1
   i32.eqz
   if
    i32.const 0
    return
   end
   i32.const -1
   i32.const 1
   local.get $2
   i32.const 45
   i32.eq
   select
   local.set $3
   local.get $0
   i32.const 2
   i32.add
   local.tee $0
   i32.load16_u
  else
   local.get $2
  end
  i32.const 48
  i32.eq
  local.get $1
  i32.const 2
  i32.gt_s
  i32.and
  if
   block $break|1
    block $case2|1
     block $case1|1
      local.get $0
      i32.load16_u offset=2
      i32.const 32
      i32.or
      local.tee $2
      i32.const 98
      i32.ne
      if
       local.get $2
       i32.const 111
       i32.eq
       br_if $case1|1
       local.get $2
       i32.const 120
       i32.eq
       br_if $case2|1
       br $break|1
      end
      local.get $0
      i32.const 4
      i32.add
      local.set $0
      local.get $1
      i32.const 2
      i32.sub
      local.set $1
      i32.const 2
      local.set $4
      br $break|1
     end
     local.get $0
     i32.const 4
     i32.add
     local.set $0
     local.get $1
     i32.const 2
     i32.sub
     local.set $1
     i32.const 8
     local.set $4
     br $break|1
    end
    local.get $0
    i32.const 4
    i32.add
    local.set $0
    local.get $1
    i32.const 2
    i32.sub
    local.set $1
    i32.const 16
    local.set $4
   end
  end
  local.get $4
  i32.const 10
  local.get $4
  select
  local.set $4
  loop $while-continue|2
   block $while-break|2
    local.get $1
    local.tee $2
    i32.const 1
    i32.sub
    local.set $1
    local.get $2
    if
     local.get $0
     i32.load16_u
     local.tee $2
     i32.const 48
     i32.sub
     i32.const 10
     i32.lt_u
     if (result i32)
      local.get $2
      i32.const 48
      i32.sub
     else
      local.get $2
      i32.const 65
      i32.sub
      i32.const 25
      i32.le_u
      if (result i32)
       local.get $2
       i32.const 55
       i32.sub
      else
       local.get $2
       i32.const 87
       i32.sub
       local.get $2
       local.get $2
       i32.const 97
       i32.sub
       i32.const 25
       i32.le_u
       select
      end
     end
     local.tee $2
     local.get $4
     i32.ge_u
     if
      local.get $5
      i32.eqz
      if
       i32.const 0
       return
      end
      br $while-break|2
     end
     local.get $2
     local.get $4
     local.get $5
     i32.mul
     i32.add
     local.set $5
     local.get $0
     i32.const 2
     i32.add
     local.set $0
     br $while-continue|2
    end
   end
  end
  local.get $3
  local.get $5
  i32.mul
 )
 (func $~lib/as-string-sink/index/StringSink#writeCodePoint (param $0 i32) (param $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i32.const 0
  i32.store
  local.get $0
  i32.load offset=4
  local.get $2
  local.get $0
  i32.load
  local.tee $2
  i32.store
  i32.const 2
  local.get $1
  i32.const 65535
  i32.gt_u
  local.tee $3
  i32.shl
  i32.add
  local.tee $4
  local.get $2
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.gt_u
  if
   local.get $0
   local.get $2
   i32.const 1
   i32.const 32
   local.get $4
   i32.const 1
   i32.sub
   i32.clz
   i32.sub
   i32.shl
   call $~lib/rt/itcms/__renew
   local.tee $2
   i32.store
   local.get $2
   if
    local.get $0
    local.get $2
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
  end
  local.get $0
  i32.load offset=4
  local.tee $2
  local.get $0
  i32.load
  i32.add
  local.set $4
  local.get $3
  if
   local.get $1
   i32.const 1114111
   i32.gt_u
   if
    i32.const 0
    i32.const 4336
    i32.const 105
    i32.const 7
    call $~lib/builtins/abort
    unreachable
   end
   local.get $4
   local.get $1
   i32.const 65536
   i32.sub
   local.tee $1
   i32.const 10
   i32.shr_u
   i32.const 55296
   i32.or
   local.get $1
   i32.const 1023
   i32.and
   i32.const 56320
   i32.or
   i32.const 16
   i32.shl
   i32.or
   i32.store
   local.get $0
   local.get $2
   i32.const 4
   i32.add
   i32.store offset=4
  else
   local.get $4
   local.get $1
   i32.store16
   local.get $0
   local.get $2
   i32.const 2
   i32.add
   i32.store offset=4
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/json-as/index/parseArray<~lib/array/Array<~lib/string/String>> (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 5588
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   i64.const 0
   i64.store
   local.get $1
   i32.const 8
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5588
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $2
   i64.const 0
   i64.store
   local.get $2
   i32.const 16
   i32.const 6
   call $~lib/rt/itcms/__new
   local.tee $2
   i32.store
   local.get $2
   i32.const 0
   i32.store
   local.get $2
   i32.const 0
   i32.store offset=4
   local.get $2
   i32.const 0
   i32.store offset=8
   local.get $2
   i32.const 0
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   i32.const 32
   i32.const 0
   call $~lib/rt/itcms/__new
   local.tee $3
   i32.store offset=4
   local.get $2
   local.get $3
   i32.store
   local.get $3
   if
    local.get $2
    local.get $3
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   local.get $2
   local.get $3
   i32.store offset=4
   local.get $2
   i32.const 32
   i32.store offset=8
   local.get $2
   i32.const 0
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $1
   local.get $2
   i32.store
   local.get $0
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
   i32.const 2
   i32.ne
   if
    i32.const 1
    local.set $1
    i32.const 1
    local.set $3
    loop $for-loop|0
     local.get $0
     i32.const 20
     i32.sub
     i32.load offset=16
     i32.const 1
     i32.shr_u
     i32.const 1
     i32.sub
     local.get $3
     i32.gt_u
     if
      local.get $5
      i32.eqz
      local.get $5
      local.get $0
      i32.const 20
      i32.sub
      i32.load offset=16
      i32.const 1
      i32.shr_u
      local.get $3
      i32.le_u
      if (result i32)
       i32.const -1
      else
       local.get $3
       i32.const 1
       i32.shl
       local.get $0
       i32.add
       i32.load16_u
      end
      local.tee $4
      i32.const 34
      i32.eq
      if (result i32)
       local.get $3
       i32.const 1
       i32.sub
       local.tee $5
       local.get $0
       i32.const 20
       i32.sub
       i32.load offset=16
       i32.const 1
       i32.shr_u
       i32.ge_u
       if (result i32)
        i32.const -1
       else
        local.get $5
        i32.const 1
        i32.shl
        local.get $0
        i32.add
        i32.load16_u
       end
       i32.const 92
       i32.ne
      else
       i32.const 0
      end
      select
      local.tee $5
      i32.eqz
      if
       local.get $1
       i32.const 1
       i32.add
       local.get $1
       global.get $~lib/json-as/index/WS2code
       local.get $4
       i32.eq
       global.get $~lib/json-as/index/WS1code
       local.get $4
       i32.eq
       i32.or
       global.get $~lib/json-as/index/WS3code
       local.get $4
       i32.eq
       i32.or
       global.get $~lib/json-as/index/WS4code
       local.get $4
       i32.eq
       i32.or
       global.get $~lib/json-as/index/WS5code
       local.get $4
       i32.eq
       i32.or
       select
       local.set $1
       local.get $4
       i32.const 34
       i32.eq
       if (result i32)
        local.get $0
        local.get $1
        local.get $3
        i32.const 1
        i32.add
        call $~lib/string/String#slice
        local.set $1
        global.get $~lib/memory/__stack_pointer
        local.get $1
        i32.store offset=4
        local.get $1
        call $~lib/json-as/index/parseString
        local.set $8
        global.get $~lib/memory/__stack_pointer
        local.get $8
        i32.store offset=4
        local.get $2
        local.tee $1
        i32.load offset=8
        local.tee $9
        i32.const 2
        i32.shr_u
        local.get $1
        i32.load offset=12
        local.tee $6
        i32.const 1
        i32.add
        local.tee $4
        i32.lt_u
        if
         local.get $4
         i32.const 268435455
         i32.gt_u
         if
          i32.const 4416
          i32.const 4528
          i32.const 19
          i32.const 48
          call $~lib/builtins/abort
          unreachable
         end
         local.get $1
         i32.load
         local.tee $7
         local.get $9
         i32.const 1
         i32.shl
         local.tee $9
         i32.const 1073741820
         local.get $9
         i32.const 1073741820
         i32.lt_u
         select
         local.tee $9
         local.get $4
         i32.const 8
         local.get $4
         i32.const 8
         i32.gt_u
         select
         i32.const 2
         i32.shl
         local.tee $10
         local.get $9
         local.get $10
         i32.gt_u
         select
         local.tee $9
         call $~lib/rt/itcms/__renew
         local.tee $10
         local.get $7
         i32.ne
         if
          local.get $1
          local.get $10
          i32.store
          local.get $1
          local.get $10
          i32.store offset=4
          local.get $10
          if
           local.get $1
           local.get $10
           i32.const 0
           call $byn-split-outlined-A$~lib/rt/itcms/__link
          end
         end
         local.get $1
         local.get $9
         i32.store offset=8
        end
        local.get $1
        i32.load offset=4
        local.get $6
        i32.const 2
        i32.shl
        i32.add
        local.get $8
        i32.store
        local.get $8
        if
         local.get $1
         local.get $8
         i32.const 1
         call $byn-split-outlined-A$~lib/rt/itcms/__link
        end
        local.get $1
        local.get $4
        i32.store offset=12
        local.get $3
        i32.const 2
        i32.add
       else
        local.get $1
       end
       local.set $1
      end
      local.get $3
      i32.const 1
      i32.add
      local.set $3
      br $for-loop|0
     end
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $2
   return
  end
  i32.const 22000
  i32.const 22048
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $~lib/json-as/index/JSON.parse<~lib/array/Array<~lib/string/String>> (param $0 i32) (result i32)
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  if
   local.get $0
   i32.load16_u
   drop
  end
  local.get $0
  call $~lib/json-as/index/parseArray<~lib/array/Array<~lib/string/String>>
 )
 (func $~lib/rt/itcms/__pin (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  if
   local.get $0
   i32.const 20
   i32.sub
   local.tee $1
   i32.load offset=4
   i32.const 3
   i32.and
   i32.const 3
   i32.eq
   if
    i32.const 5264
    i32.const 1536
    i32.const 337
    i32.const 7
    call $~lib/builtins/abort
    unreachable
   end
   local.get $1
   call $~lib/rt/itcms/Object#unlink
   global.get $~lib/rt/itcms/pinSpace
   local.tee $3
   i32.load offset=8
   local.set $2
   local.get $1
   local.get $3
   i32.const 3
   i32.or
   i32.store offset=4
   local.get $1
   local.get $2
   i32.store offset=8
   local.get $2
   local.get $2
   i32.load offset=4
   i32.const 3
   i32.and
   local.get $1
   i32.or
   i32.store offset=4
   local.get $3
   local.get $1
   i32.store offset=8
  end
  local.get $0
 )
 (func $~lib/rt/itcms/__unpin (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  local.get $0
  i32.eqz
  if
   return
  end
  local.get $0
  i32.const 20
  i32.sub
  local.tee $1
  i32.load offset=4
  i32.const 3
  i32.and
  i32.const 3
  i32.ne
  if
   i32.const 5328
   i32.const 1536
   i32.const 351
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/itcms/state
  i32.const 1
  i32.eq
  if
   local.get $1
   call $~lib/rt/itcms/Object#makeGray
  else
   local.get $1
   call $~lib/rt/itcms/Object#unlink
   global.get $~lib/rt/itcms/fromSpace
   local.tee $0
   i32.load offset=8
   local.set $2
   local.get $1
   global.get $~lib/rt/itcms/white
   local.get $0
   i32.or
   i32.store offset=4
   local.get $1
   local.get $2
   i32.store offset=8
   local.get $2
   local.get $2
   i32.load offset=4
   i32.const 3
   i32.and
   local.get $1
   i32.or
   i32.store offset=4
   local.get $0
   local.get $1
   i32.store offset=8
  end
 )
 (func $~lib/rt/itcms/__collect
  global.get $~lib/rt/itcms/state
  i32.const 0
  i32.gt_s
  if
   loop $while-continue|0
    global.get $~lib/rt/itcms/state
    if
     call $~lib/rt/itcms/step
     drop
     br $while-continue|0
    end
   end
  end
  call $~lib/rt/itcms/step
  drop
  loop $while-continue|1
   global.get $~lib/rt/itcms/state
   if
    call $~lib/rt/itcms/step
    drop
    br $while-continue|1
   end
  end
  global.get $~lib/rt/itcms/total
  i64.extend_i32_u
  i64.const 200
  i64.mul
  i64.const 100
  i64.div_u
  i32.wrap_i64
  i32.const 1024
  i32.add
  global.set $~lib/rt/itcms/threshold
 )
 (func $~lib/map/Map<~lib/string/String,~lib/json-as/unknown/unknown>~visit (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  i32.load
  local.tee $1
  if
   local.get $1
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
  local.get $0
  i32.load offset=16
  i32.const 12
  i32.mul
  local.get $0
  i32.load offset=8
  local.tee $1
  local.tee $0
  i32.add
  local.set $2
  loop $while-continue|0
   local.get $0
   local.get $2
   i32.lt_u
   if
    local.get $0
    i32.load offset=8
    i32.const 1
    i32.and
    i32.eqz
    if
     local.get $0
     i32.load
     local.tee $3
     if
      local.get $3
      call $byn-split-outlined-A$~lib/rt/itcms/__visit
     end
     local.get $0
     i32.load offset=4
     local.tee $3
     if
      local.get $3
      call $byn-split-outlined-A$~lib/rt/itcms/__visit
     end
    end
    local.get $0
    i32.const 12
    i32.add
    local.set $0
    br $while-continue|0
   end
  end
  local.get $1
  if
   local.get $1
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
 )
 (func $~lib/array/Array<~lib/string/String>~visit (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  local.get $0
  i32.load offset=4
  local.tee $1
  local.get $0
  i32.load offset=12
  i32.const 2
  i32.shl
  i32.add
  local.set $3
  loop $while-continue|0
   local.get $1
   local.get $3
   i32.lt_u
   if
    local.get $1
    i32.load
    local.tee $2
    if
     local.get $2
     call $byn-split-outlined-A$~lib/rt/itcms/__visit
    end
    local.get $1
    i32.const 4
    i32.add
    local.set $1
    br $while-continue|0
   end
  end
  local.get $0
  i32.load
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
 )
 (func $~lib/rt/__visit_members (param $0 i32)
  (local $1 i32)
  block $folding-inner3
   block $folding-inner2
    block $folding-inner1
     block $folding-inner0
      block $invalid
       block $assembly/token/TransferFromArgs
        block $assembly/token/AllowanceArgs
         block $~lib/map/Map<~lib/string/String,~lib/string/String>
          block $~lib/array/Array<~lib/json-as/unknown/unknown>
           block $~lib/array/Array<~lib/string/String>
            block $~lib/map/Map<~lib/string/String,~lib/json-as/unknown/unknown>
             block $~lib/string/String
              block $~lib/arraybuffer/ArrayBuffer
               local.get $0
               i32.const 8
               i32.sub
               i32.load
               br_table $~lib/arraybuffer/ArrayBuffer $~lib/string/String $folding-inner2 $folding-inner3 $folding-inner2 $~lib/map/Map<~lib/string/String,~lib/json-as/unknown/unknown> $~lib/array/Array<~lib/string/String> $folding-inner0 $folding-inner0 $folding-inner0 $folding-inner0 $folding-inner0 $folding-inner0 $folding-inner0 $folding-inner0 $folding-inner0 $folding-inner0 $folding-inner0 $~lib/array/Array<~lib/json-as/unknown/unknown> $folding-inner1 $~lib/map/Map<~lib/string/String,~lib/string/String> $folding-inner1 $assembly/token/AllowanceArgs $folding-inner1 $assembly/token/TransferFromArgs $folding-inner2 $invalid
              end
              return
             end
             return
            end
            local.get $0
            call $~lib/map/Map<~lib/string/String,~lib/json-as/unknown/unknown>~visit
            return
           end
           local.get $0
           call $~lib/array/Array<~lib/string/String>~visit
           return
          end
          local.get $0
          call $~lib/array/Array<~lib/string/String>~visit
          return
         end
         local.get $0
         call $~lib/map/Map<~lib/string/String,~lib/json-as/unknown/unknown>~visit
         return
        end
        local.get $0
        i32.load
        local.tee $1
        if
         local.get $1
         call $byn-split-outlined-A$~lib/rt/itcms/__visit
        end
        local.get $0
        i32.load offset=4
        local.tee $1
        if
         local.get $1
         call $byn-split-outlined-A$~lib/rt/itcms/__visit
        end
        br $folding-inner3
       end
       local.get $0
       i32.load
       local.tee $1
       if
        local.get $1
        call $byn-split-outlined-A$~lib/rt/itcms/__visit
       end
       local.get $0
       i32.load offset=4
       local.tee $1
       if
        local.get $1
        call $byn-split-outlined-A$~lib/rt/itcms/__visit
       end
       local.get $0
       i32.load offset=12
       local.tee $0
       if
        local.get $0
        call $byn-split-outlined-A$~lib/rt/itcms/__visit
       end
       return
      end
      unreachable
     end
     local.get $0
     i32.load
     local.tee $0
     if
      local.get $0
      call $byn-split-outlined-A$~lib/rt/itcms/__visit
     end
     return
    end
    local.get $0
    i32.load
    local.tee $1
    if
     local.get $1
     call $byn-split-outlined-A$~lib/rt/itcms/__visit
    end
    local.get $0
    i32.load offset=8
    local.tee $0
    if
     local.get $0
     call $byn-split-outlined-A$~lib/rt/itcms/__visit
    end
    return
   end
   local.get $0
   i32.load
   local.tee $0
   if
    local.get $0
    call $byn-split-outlined-A$~lib/rt/itcms/__visit
   end
   return
  end
  local.get $0
  i32.load offset=8
  local.tee $0
  if
   local.get $0
   call $byn-split-outlined-A$~lib/rt/itcms/__visit
  end
 )
 (func $~start
  (local $0 i32)
  block $__inlined_func$start:assembly/token
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   block $folding-inner0
    global.get $~lib/memory/__stack_pointer
    i32.const 5588
    i32.lt_s
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    local.tee $0
    i32.const 0
    i32.store
    block $__inlined_func$~lib/string/String#charCodeAt (result i32)
     local.get $0
     i32.const 1344
     i32.store
     i32.const -1
     i32.const 1340
     i32.load
     i32.const 1
     i32.shr_u
     i32.eqz
     br_if $__inlined_func$~lib/string/String#charCodeAt
     drop
     i32.const 1344
     i32.load16_u
    end
    global.set $~lib/json-as/index/WS1code
    block $__inlined_func$~lib/string/String#charCodeAt0 (result i32)
     global.get $~lib/memory/__stack_pointer
     i32.const 1344
     i32.store
     i32.const -1
     i32.const 1340
     i32.load
     i32.const 1
     i32.shr_u
     i32.eqz
     br_if $__inlined_func$~lib/string/String#charCodeAt0
     drop
     i32.const 1344
     i32.load16_u
    end
    global.set $~lib/json-as/index/WS2code
    block $__inlined_func$~lib/string/String#charCodeAt2 (result i32)
     global.get $~lib/memory/__stack_pointer
     i32.const 1376
     i32.store
     i32.const -1
     i32.const 1372
     i32.load
     i32.const 1
     i32.shr_u
     i32.eqz
     br_if $__inlined_func$~lib/string/String#charCodeAt2
     drop
     i32.const 1376
     i32.load16_u
    end
    global.set $~lib/json-as/index/WS3code
    block $__inlined_func$~lib/string/String#charCodeAt4 (result i32)
     global.get $~lib/memory/__stack_pointer
     i32.const 1408
     i32.store
     i32.const -1
     i32.const 1404
     i32.load
     i32.const 1
     i32.shr_u
     i32.eqz
     br_if $__inlined_func$~lib/string/String#charCodeAt4
     drop
     i32.const 1408
     i32.load16_u
    end
    global.set $~lib/json-as/index/WS4code
    block $__inlined_func$~lib/string/String#charCodeAt6 (result i32)
     global.get $~lib/memory/__stack_pointer
     i32.const 1440
     i32.store
     i32.const -1
     i32.const 1436
     i32.load
     i32.const 1
     i32.shr_u
     i32.eqz
     br_if $__inlined_func$~lib/string/String#charCodeAt6
     drop
     i32.const 1440
     i32.load16_u
    end
    global.set $~lib/json-as/index/WS5code
    memory.size
    i32.const 16
    i32.shl
    i32.const 21972
    i32.sub
    i32.const 1
    i32.shr_u
    global.set $~lib/rt/itcms/threshold
    i32.const 1588
    i32.const 1584
    i32.store
    i32.const 1592
    i32.const 1584
    i32.store
    i32.const 1584
    global.set $~lib/rt/itcms/pinSpace
    i32.const 1620
    i32.const 1616
    i32.store
    i32.const 1624
    i32.const 1616
    i32.store
    i32.const 1616
    global.set $~lib/rt/itcms/toSpace
    i32.const 1764
    i32.const 1760
    i32.store
    i32.const 1768
    i32.const 1760
    i32.store
    i32.const 1760
    global.set $~lib/rt/itcms/fromSpace
    i32.const 1
    call $~lib/json-as/unknown/unknown.wrap<bool>
    global.set $~lib/json-as/index/unknownTrue
    i32.const 0
    call $~lib/json-as/unknown/unknown.wrap<bool>
    global.set $~lib/json-as/index/unknownFalse
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.sub
    global.set $~lib/memory/__stack_pointer
    global.get $~lib/memory/__stack_pointer
    i32.const 5588
    i32.lt_s
    br_if $folding-inner0
    global.get $~lib/memory/__stack_pointer
    local.tee $0
    i32.const 0
    i32.store
    local.get $0
    call $~lib/json-as/unknown/unknown#constructor
    local.tee $0
    i32.store
    local.get $0
    i32.const 12
    i32.store offset=4
    local.get $0
    i32.const 1936
    i32.store offset=8
    local.get $0
    i32.const 1936
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    local.get $0
    global.set $~lib/json-as/index/unknownNull
    block $__inlined_func$~lib/string/String#charCodeAt15 (result i32)
     global.get $~lib/memory/__stack_pointer
     i32.const 1344
     i32.store
     i32.const -1
     i32.const 1340
     i32.load
     i32.const 1
     i32.shr_u
     i32.eqz
     br_if $__inlined_func$~lib/string/String#charCodeAt15
     drop
     i32.const 1344
     i32.load16_u
    end
    global.set $~lib/json-as/index/empty_stringCode
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
    br $__inlined_func$start:assembly/token
   end
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
 )
 (func $assembly/token/MintArgs#__encode (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 56
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  i64.const 0
  i64.store offset=8
  local.get $1
  i64.const 0
  i64.store offset=16
  local.get $1
  i64.const 0
  i64.store offset=24
  local.get $1
  i64.const 0
  i64.store offset=32
  local.get $1
  i64.const 0
  i64.store offset=40
  local.get $1
  i64.const 0
  i64.store offset=48
  local.get $1
  local.get $0
  i32.load offset=8
  local.tee $1
  i32.store
  local.get $1
  if (result i32)
   local.get $1
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
  else
   i32.const 0
  end
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.load offset=8
   local.tee $2
   i32.store
   local.get $1
   i32.const 1872
   i32.store offset=48
   local.get $1
   i32.const 1056
   i32.store offset=52
   i32.const 1872
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=40
   global.get $~lib/memory/__stack_pointer
   i32.const 2000
   i32.store offset=44
   local.get $1
   i32.const 2000
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=32
   global.get $~lib/memory/__stack_pointer
   i32.const 1056
   i32.store offset=36
   local.get $1
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=24
   global.get $~lib/memory/__stack_pointer
   i32.const 2048
   i32.store offset=28
   local.get $1
   i32.const 2048
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $3
   i32.store offset=24
   local.get $3
   call $~lib/json-as/index/JSON.stringify<~lib/string/String>
   local.set $3
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=20
   local.get $1
   local.get $3
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 2080
   i32.store offset=12
   local.get $1
   i32.const 2080
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $2
   local.get $1
   call $~lib/string/String.__concat
   local.tee $1
   i32.store offset=8
   local.get $1
   if
    local.get $0
    local.get $1
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.load offset=8
   local.tee $2
   i32.store
   local.get $1
   i32.const 1872
   i32.store offset=48
   local.get $1
   i32.const 1056
   i32.store offset=52
   i32.const 1872
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=40
   global.get $~lib/memory/__stack_pointer
   i32.const 2112
   i32.store offset=44
   local.get $1
   i32.const 2112
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=32
   global.get $~lib/memory/__stack_pointer
   i32.const 1056
   i32.store offset=36
   local.get $1
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=24
   global.get $~lib/memory/__stack_pointer
   i32.const 2048
   i32.store offset=28
   local.get $1
   i32.const 2048
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=16
   local.get $0
   i32.load offset=4
   call $~lib/number/U32#toString
   local.set $3
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=20
   local.get $1
   local.get $3
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 2080
   i32.store offset=12
   local.get $1
   i32.const 2080
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $2
   local.get $1
   call $~lib/string/String.__concat
   local.tee $1
   i32.store offset=8
   local.get $1
   if
    local.get $0
    local.get $1
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.load offset=8
   local.tee $2
   i32.store
   local.get $1
   local.get $0
   i32.load offset=8
   local.tee $1
   i32.store offset=4
   local.get $0
   local.get $2
   i32.const 0
   local.get $1
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
   i32.const 1
   i32.sub
   call $~lib/string/String#slice
   local.tee $1
   i32.store offset=8
   local.get $1
   if
    local.get $0
    local.get $1
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 56
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/map/Map<~lib/string/String,~lib/string/String>#find (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.load
  local.get $0
  i32.load offset=4
  local.get $2
  i32.and
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.set $0
  loop $while-continue|0
   local.get $0
   if
    local.get $0
    i32.load offset=8
    local.tee $2
    i32.const 1
    i32.and
    if (result i32)
     i32.const 0
    else
     global.get $~lib/memory/__stack_pointer
     local.get $0
     i32.load
     local.tee $3
     i32.store
     local.get $3
     local.get $1
     call $~lib/string/String.__eq
    end
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.add
     global.set $~lib/memory/__stack_pointer
     local.get $0
     return
    end
    local.get $2
    i32.const -2
    i32.and
    local.set $0
    br $while-continue|0
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  i32.const 0
 )
 (func $~lib/json-as/index/parseString (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.const 1
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  i32.const 1
  i32.sub
  call $~lib/string/String#slice
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 1312
  i32.store offset=4
  global.get $~lib/memory/__stack_pointer
  i32.const 1056
  i32.store offset=8
  local.get $0
  i32.const 1312
  i32.const 1056
  call $~lib/string/String#replaceAll
  global.get $~lib/memory/__stack_pointer
  i32.const 12
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/json-as/index/JSON.parse<~lib/string/String> (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  if
   local.get $0
   i32.load16_u
   drop
  end
  local.get $0
  call $~lib/string/String#trim
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/json-as/index/parseString
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/json-as/index/JSON.parse<u32> (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  if
   local.get $0
   i32.load16_u
   drop
  end
  local.get $0
  call $~lib/string/String#trim
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $~lib/util/string/strtol<i32>
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/token/MintArgs#__decode (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i64.const 0
  i64.store
  local.get $2
  i64.const 0
  i64.store offset=8
  local.get $2
  i32.const 0
  call $assembly/token/MintArgs#constructor
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 2000
  i32.store offset=8
  local.get $0
  i32.const 2000
  call $~lib/map/Map<~lib/string/String,~lib/string/String>#get
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $1
  local.get $3
  call $~lib/json-as/index/JSON.parse<~lib/string/String>
  local.tee $3
  i32.store
  local.get $3
  if
   local.get $1
   local.get $3
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 2112
  i32.store offset=8
  local.get $0
  i32.const 2112
  call $~lib/map/Map<~lib/string/String,~lib/string/String>#get
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $1
  local.get $0
  call $~lib/json-as/index/JSON.parse<u32>
  i32.store offset=4
  local.get $2
  local.get $1
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $assembly/token/AllowArgs#__encode (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 56
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  i64.const 0
  i64.store offset=8
  local.get $1
  i64.const 0
  i64.store offset=16
  local.get $1
  i64.const 0
  i64.store offset=24
  local.get $1
  i64.const 0
  i64.store offset=32
  local.get $1
  i64.const 0
  i64.store offset=40
  local.get $1
  i64.const 0
  i64.store offset=48
  local.get $1
  local.get $0
  i32.load offset=8
  local.tee $1
  i32.store
  local.get $1
  if (result i32)
   local.get $1
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
  else
   i32.const 0
  end
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.load offset=8
   local.tee $2
   i32.store
   local.get $1
   i32.const 1872
   i32.store offset=48
   local.get $1
   i32.const 1056
   i32.store offset=52
   i32.const 1872
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=40
   global.get $~lib/memory/__stack_pointer
   i32.const 4032
   i32.store offset=44
   local.get $1
   i32.const 4032
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=32
   global.get $~lib/memory/__stack_pointer
   i32.const 1056
   i32.store offset=36
   local.get $1
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=24
   global.get $~lib/memory/__stack_pointer
   i32.const 2048
   i32.store offset=28
   local.get $1
   i32.const 2048
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $3
   i32.store offset=24
   local.get $3
   call $~lib/json-as/index/JSON.stringify<~lib/string/String>
   local.set $3
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=20
   local.get $1
   local.get $3
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 2080
   i32.store offset=12
   local.get $1
   i32.const 2080
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $2
   local.get $1
   call $~lib/string/String.__concat
   local.tee $1
   i32.store offset=8
   local.get $1
   if
    local.get $0
    local.get $1
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.load offset=8
   local.tee $2
   i32.store
   local.get $1
   i32.const 1872
   i32.store offset=48
   local.get $1
   i32.const 1056
   i32.store offset=52
   i32.const 1872
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=40
   global.get $~lib/memory/__stack_pointer
   i32.const 2112
   i32.store offset=44
   local.get $1
   i32.const 2112
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=32
   global.get $~lib/memory/__stack_pointer
   i32.const 1056
   i32.store offset=36
   local.get $1
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=24
   global.get $~lib/memory/__stack_pointer
   i32.const 2048
   i32.store offset=28
   local.get $1
   i32.const 2048
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=16
   local.get $0
   i32.load offset=4
   call $~lib/number/U32#toString
   local.set $3
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=20
   local.get $1
   local.get $3
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 2080
   i32.store offset=12
   local.get $1
   i32.const 2080
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $2
   local.get $1
   call $~lib/string/String.__concat
   local.tee $1
   i32.store offset=8
   local.get $1
   if
    local.get $0
    local.get $1
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.load offset=8
   local.tee $2
   i32.store
   local.get $1
   local.get $0
   i32.load offset=8
   local.tee $1
   i32.store offset=4
   local.get $0
   local.get $2
   i32.const 0
   local.get $1
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
   i32.const 1
   i32.sub
   call $~lib/string/String#slice
   local.tee $1
   i32.store offset=8
   local.get $1
   if
    local.get $0
    local.get $1
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 56
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/token/AllowArgs#__decode (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i64.const 0
  i64.store
  local.get $2
  i64.const 0
  i64.store offset=8
  local.get $2
  i32.const 0
  call $assembly/token/AllowArgs#constructor
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4032
  i32.store offset=8
  local.get $0
  i32.const 4032
  call $~lib/map/Map<~lib/string/String,~lib/string/String>#get
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $1
  local.get $3
  call $~lib/json-as/index/JSON.parse<~lib/string/String>
  local.tee $3
  i32.store
  local.get $3
  if
   local.get $1
   local.get $3
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 2112
  i32.store offset=8
  local.get $0
  i32.const 2112
  call $~lib/map/Map<~lib/string/String,~lib/string/String>#get
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $1
  local.get $0
  call $~lib/json-as/index/JSON.parse<u32>
  i32.store offset=4
  local.get $2
  local.get $1
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $assembly/token/AllowanceArgs#__encode (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 56
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  i64.const 0
  i64.store offset=8
  local.get $1
  i64.const 0
  i64.store offset=16
  local.get $1
  i64.const 0
  i64.store offset=24
  local.get $1
  i64.const 0
  i64.store offset=32
  local.get $1
  i64.const 0
  i64.store offset=40
  local.get $1
  i64.const 0
  i64.store offset=48
  local.get $1
  local.get $0
  i32.load offset=8
  local.tee $1
  i32.store
  local.get $1
  if (result i32)
   local.get $1
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
  else
   i32.const 0
  end
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.load offset=8
   local.tee $2
   i32.store
   local.get $1
   i32.const 1872
   i32.store offset=48
   local.get $1
   i32.const 1056
   i32.store offset=52
   i32.const 1872
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=40
   global.get $~lib/memory/__stack_pointer
   i32.const 4080
   i32.store offset=44
   local.get $1
   i32.const 4080
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=32
   global.get $~lib/memory/__stack_pointer
   i32.const 1056
   i32.store offset=36
   local.get $1
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=24
   global.get $~lib/memory/__stack_pointer
   i32.const 2048
   i32.store offset=28
   local.get $1
   i32.const 2048
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $3
   i32.store offset=24
   local.get $3
   call $~lib/json-as/index/JSON.stringify<~lib/string/String>
   local.set $3
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=20
   local.get $1
   local.get $3
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 2080
   i32.store offset=12
   local.get $1
   i32.const 2080
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $2
   local.get $1
   call $~lib/string/String.__concat
   local.tee $1
   i32.store offset=8
   local.get $1
   if
    local.get $0
    local.get $1
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.load offset=8
   local.tee $2
   i32.store
   local.get $1
   i32.const 1872
   i32.store offset=48
   local.get $1
   i32.const 1056
   i32.store offset=52
   i32.const 1872
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=40
   global.get $~lib/memory/__stack_pointer
   i32.const 4032
   i32.store offset=44
   local.get $1
   i32.const 4032
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=32
   global.get $~lib/memory/__stack_pointer
   i32.const 1056
   i32.store offset=36
   local.get $1
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=24
   global.get $~lib/memory/__stack_pointer
   i32.const 2048
   i32.store offset=28
   local.get $1
   i32.const 2048
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load offset=4
   local.tee $3
   i32.store offset=24
   local.get $3
   call $~lib/json-as/index/JSON.stringify<~lib/string/String>
   local.set $3
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=20
   local.get $1
   local.get $3
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 2080
   i32.store offset=12
   local.get $1
   i32.const 2080
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $2
   local.get $1
   call $~lib/string/String.__concat
   local.tee $1
   i32.store offset=8
   local.get $1
   if
    local.get $0
    local.get $1
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.load offset=8
   local.tee $2
   i32.store
   local.get $1
   local.get $0
   i32.load offset=8
   local.tee $1
   i32.store offset=4
   local.get $0
   local.get $2
   i32.const 0
   local.get $1
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
   i32.const 1
   i32.sub
   call $~lib/string/String#slice
   local.tee $1
   i32.store offset=8
   local.get $1
   if
    local.get $0
    local.get $1
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 56
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/token/AllowanceArgs#__decode (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i64.const 0
  i64.store
  local.get $2
  i64.const 0
  i64.store offset=8
  local.get $2
  i32.const 0
  call $assembly/token/AllowanceArgs#constructor
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4080
  i32.store offset=8
  local.get $0
  i32.const 4080
  call $~lib/map/Map<~lib/string/String,~lib/string/String>#get
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $1
  local.get $3
  call $~lib/json-as/index/JSON.parse<~lib/string/String>
  local.tee $3
  i32.store
  local.get $3
  if
   local.get $1
   local.get $3
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4032
  i32.store offset=8
  local.get $0
  i32.const 4032
  call $~lib/map/Map<~lib/string/String,~lib/string/String>#get
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $1
  local.get $0
  call $~lib/json-as/index/JSON.parse<~lib/string/String>
  local.tee $0
  i32.store offset=4
  local.get $0
  if
   local.get $1
   local.get $0
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  local.get $2
  local.get $1
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $assembly/token/TransferArgs#__encode (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 56
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  i64.const 0
  i64.store offset=8
  local.get $1
  i64.const 0
  i64.store offset=16
  local.get $1
  i64.const 0
  i64.store offset=24
  local.get $1
  i64.const 0
  i64.store offset=32
  local.get $1
  i64.const 0
  i64.store offset=40
  local.get $1
  i64.const 0
  i64.store offset=48
  local.get $1
  local.get $0
  i32.load offset=8
  local.tee $1
  i32.store
  local.get $1
  if (result i32)
   local.get $1
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
  else
   i32.const 0
  end
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.load offset=8
   local.tee $2
   i32.store
   local.get $1
   i32.const 1872
   i32.store offset=48
   local.get $1
   i32.const 1056
   i32.store offset=52
   i32.const 1872
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=40
   global.get $~lib/memory/__stack_pointer
   i32.const 4112
   i32.store offset=44
   local.get $1
   i32.const 4112
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=32
   global.get $~lib/memory/__stack_pointer
   i32.const 1056
   i32.store offset=36
   local.get $1
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=24
   global.get $~lib/memory/__stack_pointer
   i32.const 2048
   i32.store offset=28
   local.get $1
   i32.const 2048
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $3
   i32.store offset=24
   local.get $3
   call $~lib/json-as/index/JSON.stringify<~lib/string/String>
   local.set $3
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=20
   local.get $1
   local.get $3
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 2080
   i32.store offset=12
   local.get $1
   i32.const 2080
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $2
   local.get $1
   call $~lib/string/String.__concat
   local.tee $1
   i32.store offset=8
   local.get $1
   if
    local.get $0
    local.get $1
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.load offset=8
   local.tee $2
   i32.store
   local.get $1
   i32.const 1872
   i32.store offset=48
   local.get $1
   i32.const 1056
   i32.store offset=52
   i32.const 1872
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=40
   global.get $~lib/memory/__stack_pointer
   i32.const 2112
   i32.store offset=44
   local.get $1
   i32.const 2112
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=32
   global.get $~lib/memory/__stack_pointer
   i32.const 1056
   i32.store offset=36
   local.get $1
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=24
   global.get $~lib/memory/__stack_pointer
   i32.const 2048
   i32.store offset=28
   local.get $1
   i32.const 2048
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=16
   local.get $0
   i32.load offset=4
   call $~lib/number/U32#toString
   local.set $3
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=20
   local.get $1
   local.get $3
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 2080
   i32.store offset=12
   local.get $1
   i32.const 2080
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $2
   local.get $1
   call $~lib/string/String.__concat
   local.tee $1
   i32.store offset=8
   local.get $1
   if
    local.get $0
    local.get $1
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.load offset=8
   local.tee $2
   i32.store
   local.get $1
   local.get $0
   i32.load offset=8
   local.tee $1
   i32.store offset=4
   local.get $0
   local.get $2
   i32.const 0
   local.get $1
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
   i32.const 1
   i32.sub
   call $~lib/string/String#slice
   local.tee $1
   i32.store offset=8
   local.get $1
   if
    local.get $0
    local.get $1
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 56
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/token/TransferArgs#__decode (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i64.const 0
  i64.store
  local.get $2
  i64.const 0
  i64.store offset=8
  local.get $2
  i32.const 0
  call $assembly/token/TransferArgs#constructor
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4112
  i32.store offset=8
  local.get $0
  i32.const 4112
  call $~lib/map/Map<~lib/string/String,~lib/string/String>#get
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $1
  local.get $3
  call $~lib/json-as/index/JSON.parse<~lib/string/String>
  local.tee $3
  i32.store
  local.get $3
  if
   local.get $1
   local.get $3
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 2112
  i32.store offset=8
  local.get $0
  i32.const 2112
  call $~lib/map/Map<~lib/string/String,~lib/string/String>#get
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $1
  local.get $0
  call $~lib/json-as/index/JSON.parse<u32>
  i32.store offset=4
  local.get $2
  local.get $1
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $assembly/token/TransferFromArgs#__encode (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 56
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  i64.const 0
  i64.store offset=8
  local.get $1
  i64.const 0
  i64.store offset=16
  local.get $1
  i64.const 0
  i64.store offset=24
  local.get $1
  i64.const 0
  i64.store offset=32
  local.get $1
  i64.const 0
  i64.store offset=40
  local.get $1
  i64.const 0
  i64.store offset=48
  local.get $1
  local.get $0
  i32.load offset=12
  local.tee $1
  i32.store
  local.get $1
  if (result i32)
   local.get $1
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
  else
   i32.const 0
  end
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.load offset=12
   local.tee $2
   i32.store
   local.get $1
   i32.const 1872
   i32.store offset=48
   local.get $1
   i32.const 1056
   i32.store offset=52
   i32.const 1872
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=40
   global.get $~lib/memory/__stack_pointer
   i32.const 4080
   i32.store offset=44
   local.get $1
   i32.const 4080
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=32
   global.get $~lib/memory/__stack_pointer
   i32.const 1056
   i32.store offset=36
   local.get $1
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=24
   global.get $~lib/memory/__stack_pointer
   i32.const 2048
   i32.store offset=28
   local.get $1
   i32.const 2048
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $3
   i32.store offset=24
   local.get $3
   call $~lib/json-as/index/JSON.stringify<~lib/string/String>
   local.set $3
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=20
   local.get $1
   local.get $3
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 2080
   i32.store offset=12
   local.get $1
   i32.const 2080
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $2
   local.get $1
   call $~lib/string/String.__concat
   local.tee $1
   i32.store offset=12
   local.get $1
   if
    local.get $0
    local.get $1
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.load offset=12
   local.tee $2
   i32.store
   local.get $1
   i32.const 1872
   i32.store offset=48
   local.get $1
   i32.const 1056
   i32.store offset=52
   i32.const 1872
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=40
   global.get $~lib/memory/__stack_pointer
   i32.const 4112
   i32.store offset=44
   local.get $1
   i32.const 4112
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=32
   global.get $~lib/memory/__stack_pointer
   i32.const 1056
   i32.store offset=36
   local.get $1
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=24
   global.get $~lib/memory/__stack_pointer
   i32.const 2048
   i32.store offset=28
   local.get $1
   i32.const 2048
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load offset=4
   local.tee $3
   i32.store offset=24
   local.get $3
   call $~lib/json-as/index/JSON.stringify<~lib/string/String>
   local.set $3
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=20
   local.get $1
   local.get $3
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 2080
   i32.store offset=12
   local.get $1
   i32.const 2080
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $2
   local.get $1
   call $~lib/string/String.__concat
   local.tee $1
   i32.store offset=12
   local.get $1
   if
    local.get $0
    local.get $1
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.load offset=12
   local.tee $2
   i32.store
   local.get $1
   i32.const 1872
   i32.store offset=48
   local.get $1
   i32.const 1056
   i32.store offset=52
   i32.const 1872
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=40
   global.get $~lib/memory/__stack_pointer
   i32.const 2112
   i32.store offset=44
   local.get $1
   i32.const 2112
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=32
   global.get $~lib/memory/__stack_pointer
   i32.const 1056
   i32.store offset=36
   local.get $1
   i32.const 1056
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=24
   global.get $~lib/memory/__stack_pointer
   i32.const 2048
   i32.store offset=28
   local.get $1
   i32.const 2048
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=16
   local.get $0
   i32.load offset=8
   call $~lib/number/U32#toString
   local.set $3
   global.get $~lib/memory/__stack_pointer
   local.get $3
   i32.store offset=20
   local.get $1
   local.get $3
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   i32.const 2080
   i32.store offset=12
   local.get $1
   i32.const 2080
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $0
   local.get $2
   local.get $1
   call $~lib/string/String.__concat
   local.tee $1
   i32.store offset=12
   local.get $1
   if
    local.get $0
    local.get $1
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.load offset=12
   local.tee $2
   i32.store
   local.get $1
   local.get $0
   i32.load offset=12
   local.tee $1
   i32.store offset=4
   local.get $0
   local.get $2
   i32.const 0
   local.get $1
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
   i32.const 1
   i32.sub
   call $~lib/string/String#slice
   local.tee $1
   i32.store offset=12
   local.get $1
   if
    local.get $0
    local.get $1
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 56
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/token/TransferFromArgs#__decode (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i64.const 0
  i64.store
  local.get $2
  i64.const 0
  i64.store offset=8
  local.get $2
  i32.const 0
  call $assembly/token/TransferFromArgs#constructor
  local.tee $1
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4080
  i32.store offset=8
  local.get $0
  i32.const 4080
  call $~lib/map/Map<~lib/string/String,~lib/string/String>#get
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $1
  local.get $3
  call $~lib/json-as/index/JSON.parse<~lib/string/String>
  local.tee $3
  i32.store
  local.get $3
  if
   local.get $1
   local.get $3
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4112
  i32.store offset=8
  local.get $0
  i32.const 4112
  call $~lib/map/Map<~lib/string/String,~lib/string/String>#get
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $1
  local.get $3
  call $~lib/json-as/index/JSON.parse<~lib/string/String>
  local.tee $3
  i32.store offset=4
  local.get $3
  if
   local.get $1
   local.get $3
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 2112
  i32.store offset=8
  local.get $0
  i32.const 2112
  call $~lib/map/Map<~lib/string/String,~lib/string/String>#get
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store offset=4
  local.get $1
  local.get $0
  call $~lib/json-as/index/JSON.parse<u32>
  i32.store offset=8
  local.get $2
  local.get $1
  i32.store offset=12
  global.get $~lib/memory/__stack_pointer
  i32.const 16
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $assembly/token/name (result i32)
  (local $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 4144
  i32.store
  i32.const 4144
  call $~lib/massa-sc-std/index/assembly_script_get_data
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/token/symbol (result i32)
  (local $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 4176
  i32.store
  i32.const 4176
  call $~lib/massa-sc-std/index/assembly_script_get_data
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/token/decimals (result i32)
  (local $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 4208
  i32.store
  i32.const 4208
  call $~lib/massa-sc-std/index/assembly_script_get_data
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/token/totalSupply (result i32)
  (local $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 4256
  i32.store
  i32.const 4256
  call $~lib/massa-sc-std/index/assembly_script_get_data
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/token/_balKey (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i32.const 0
  i32.store
  local.get $1
  i32.const 4304
  i32.store
  i32.const 4304
  local.get $0
  call $~lib/string/String.__concat
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/token/balanceOf (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i64.const 0
  i64.store
  local.get $1
  local.get $0
  call $assembly/token/_balKey
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 2336
  i32.store offset=4
  block $__inlined_func$~lib/massa-sc-std/index/Storage.get_data_or_default (result i32)
   local.get $0
   call $~lib/massa-sc-std/index/assembly_script_has_data
   if
    local.get $0
    call $~lib/massa-sc-std/index/assembly_script_get_data
    br $__inlined_func$~lib/massa-sc-std/index/Storage.get_data_or_default
   end
   i32.const 2336
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/json-as/index/removeJSONWhitespace (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 5588
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $3
   i64.const 0
   i64.store
   local.get $3
   i32.const 1872
   i32.store
   local.get $3
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5588
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $4
   i32.const 0
   i32.store
   local.get $4
   i32.const 8
   i32.const 25
   call $~lib/rt/itcms/__new
   local.tee $5
   i32.store
   local.get $5
   i32.const 0
   i32.store
   local.get $5
   i32.const 0
   i32.store offset=4
   local.get $5
   i32.const 1868
   i32.load
   i32.const 1
   i32.shr_u
   i32.const 1
   i32.shl
   local.tee $4
   i32.const 64
   local.get $4
   i32.const 64
   i32.gt_u
   select
   i32.const 0
   call $~lib/rt/itcms/__new
   local.tee $6
   i32.store
   local.get $6
   if
    local.get $5
    local.get $6
    i32.const 0
    call $byn-split-outlined-A$~lib/rt/itcms/__link
   end
   local.get $4
   if
    local.get $5
    i32.load
    i32.const 1872
    local.get $4
    call $~lib/memory/memory.copy
    local.get $5
    local.get $4
    local.get $5
    i32.load offset=4
    i32.add
    i32.store offset=4
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $3
   local.get $5
   i32.store offset=4
   loop $for-loop|0
    local.get $0
    i32.const 20
    i32.sub
    i32.load offset=16
    i32.const 1
    i32.shr_u
    local.get $1
    i32.gt_s
    if
     local.get $2
     i32.eqz
     local.get $2
     local.get $0
     i32.const 20
     i32.sub
     i32.load offset=16
     i32.const 1
     i32.shr_u
     local.get $1
     i32.le_u
     if (result i32)
      i32.const -1
     else
      local.get $1
      i32.const 1
      i32.shl
      local.get $0
      i32.add
      i32.load16_u
     end
     local.tee $3
     i32.const 34
     i32.eq
     if (result i32)
      local.get $1
      i32.const 1
      i32.sub
      local.tee $2
      local.get $0
      i32.const 20
      i32.sub
      i32.load offset=16
      i32.const 1
      i32.shr_u
      i32.ge_u
      if (result i32)
       i32.const -1
      else
       local.get $2
       i32.const 1
       i32.shl
       local.get $0
       i32.add
       i32.load16_u
      end
      i32.const 92
      i32.eq
     else
      i32.const 0
     end
     select
     local.tee $2
     if
      local.get $5
      local.get $3
      call $~lib/as-string-sink/index/StringSink#writeCodePoint
     else
      i32.const 0
      global.get $~lib/json-as/index/empty_stringCode
      local.get $3
      i32.ne
      local.get $2
      select
      if
       local.get $5
       local.get $3
       call $~lib/as-string-sink/index/StringSink#writeCodePoint
      end
     end
     local.get $1
     i32.const 1
     i32.add
     local.set $1
     br $for-loop|0
    end
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5588
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   block $__inlined_func$~lib/as-string-sink/index/StringSink#toString
    local.get $5
    i32.load offset=4
    local.tee $1
    i32.eqz
    if
     global.get $~lib/memory/__stack_pointer
     i32.const 4
     i32.add
     global.set $~lib/memory/__stack_pointer
     i32.const 1872
     local.set $0
     br $__inlined_func$~lib/as-string-sink/index/StringSink#toString
    end
    global.get $~lib/memory/__stack_pointer
    local.get $1
    i32.const 1
    call $~lib/rt/itcms/__new
    local.tee $0
    i32.store
    local.get $0
    local.get $5
    i32.load
    local.get $1
    call $~lib/memory/memory.copy
    global.get $~lib/memory/__stack_pointer
    i32.const 4
    i32.add
    global.set $~lib/memory/__stack_pointer
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  i32.const 22000
  i32.const 22048
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $~lib/json-as/index/parseObject<assembly/token/TransferArgs> (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i64.const 0
  i64.store
  local.get $2
  i64.const 0
  i64.store offset=8
  local.get $2
  i64.const 0
  i64.store offset=16
  local.get $2
  local.get $0
  call $~lib/json-as/index/removeJSONWhitespace
  local.tee $3
  i32.store
  local.get $3
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  i32.const 1
  i32.sub
  local.set $7
  global.get $~lib/memory/__stack_pointer
  call $~lib/map/Map<~lib/string/String,~lib/string/String>#constructor
  local.tee $4
  i32.store offset=4
  i32.const 1
  local.set $0
  i32.const 1872
  local.set $5
  global.get $~lib/memory/__stack_pointer
  i32.const 1872
  i32.store offset=8
  i32.const 1
  local.set $2
  loop $for-loop|0
   local.get $2
   local.get $7
   i32.lt_u
   if
    local.get $3
    i32.const 20
    i32.sub
    i32.load offset=16
    i32.const 1
    i32.shr_u
    local.get $2
    i32.le_u
    if (result i32)
     i32.const -1
    else
     local.get $2
     i32.const 1
     i32.shl
     local.get $3
     i32.add
     i32.load16_u
    end
    local.tee $10
    i32.const 34
    i32.eq
    if (result i32)
     local.get $2
     i32.const 1
     i32.sub
     local.tee $9
     local.get $3
     i32.const 20
     i32.sub
     i32.load offset=16
     i32.const 1
     i32.shr_u
     i32.ge_u
     if (result i32)
      i32.const -1
     else
      local.get $9
      i32.const 1
      i32.shl
      local.get $3
      i32.add
      i32.load16_u
     end
     i32.const 92
     i32.ne
    else
     i32.const 0
    end
    if
     local.get $8
     i32.eqz
     local.set $8
    else
     local.get $8
     i32.eqz
     if
      local.get $6
      i32.const 1
      i32.add
      local.get $6
      local.get $10
      i32.const 93
      i32.eq
      local.get $10
      i32.const 125
      i32.eq
      i32.or
      select
      local.set $6
      local.get $1
      i32.const 1
      i32.add
      local.get $1
      local.get $10
      i32.const 91
      i32.eq
      local.get $10
      i32.const 123
      i32.eq
      i32.or
      select
      local.set $1
     end
    end
    local.get $1
    local.get $6
    i32.eq
    i32.const 0
    local.get $1
    select
    if
     local.get $3
     local.get $0
     i32.const 1
     i32.add
     local.get $2
     i32.const 1
     i32.add
     local.tee $0
     call $~lib/string/String#slice
     local.set $1
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=16
     local.get $1
     call $~lib/string/String#trim
     local.set $1
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=12
     local.get $4
     local.get $5
     local.get $1
     call $~lib/map/Map<~lib/string/String,~lib/string/String>#set
     i32.const 0
     local.set $6
     i32.const 0
     local.set $1
    end
    local.get $1
    i32.eqz
    if
     local.get $10
     i32.const 58
     i32.eq
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $3
      local.get $0
      i32.const 1
      i32.add
      local.get $2
      i32.const 1
      i32.sub
      call $~lib/string/String#slice
      local.set $0
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=20
      local.get $0
      call $~lib/string/String#trim
      local.tee $5
      i32.store offset=8
      local.get $2
     else
      local.get $10
      i32.const 44
      i32.eq
      if (result i32)
       local.get $0
       local.get $2
       i32.ne
       if
        local.get $3
        local.get $0
        i32.const 1
        i32.add
        local.get $2
        call $~lib/string/String#slice
        local.set $0
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=16
        local.get $0
        call $~lib/string/String#trim
        local.set $0
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=12
        local.get $4
        local.get $5
        local.get $0
        call $~lib/map/Map<~lib/string/String,~lib/string/String>#set
       end
       local.get $2
       i32.const 1
       i32.add
      else
       local.get $0
      end
     end
     local.set $0
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  local.get $0
  local.get $7
  i32.ne
  if
   local.get $3
   local.get $0
   i32.const 1
   i32.add
   local.get $7
   call $~lib/string/String#slice
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=16
   local.get $0
   call $~lib/string/String#trim
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=12
   local.get $4
   local.get $5
   local.get $0
   call $~lib/map/Map<~lib/string/String,~lib/string/String>#set
  end
  local.get $4
  call $assembly/token/TransferArgs#__decode
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/token/_transfer (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  local.get $0
  call $assembly/token/balanceOf
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store
  local.get $2
  local.get $3
  call $~lib/util/string/strtol<i32>
  local.tee $3
  i32.ge_u
  if
   i32.const 4832
   i32.const 4896
   i32.const 125
   i32.const 5
   call $~lib/builtins/abort
   unreachable
  end
  local.get $1
  call $assembly/token/balanceOf
  local.set $4
  global.get $~lib/memory/__stack_pointer
  local.get $4
  i32.store
  local.get $4
  call $~lib/util/string/strtol<i32>
  local.set $4
  local.get $0
  call $assembly/token/_balKey
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $3
  local.get $2
  i32.sub
  call $~lib/number/U32#toString
  local.set $3
  global.get $~lib/memory/__stack_pointer
  local.get $3
  i32.store offset=4
  local.get $0
  local.get $3
  call $~lib/massa-sc-std/index/assembly_script_set_data
  local.get $1
  call $assembly/token/_balKey
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $2
  local.get $4
  i32.add
  call $~lib/number/U32#toString
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $0
  local.get $1
  call $~lib/massa-sc-std/index/assembly_script_set_data
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $2
 )
 (func $~lib/json-as/index/parseObject<assembly/token/AllowArgs> (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i64.const 0
  i64.store
  local.get $2
  i64.const 0
  i64.store offset=8
  local.get $2
  i64.const 0
  i64.store offset=16
  local.get $2
  local.get $0
  call $~lib/json-as/index/removeJSONWhitespace
  local.tee $3
  i32.store
  local.get $3
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  i32.const 1
  i32.sub
  local.set $7
  global.get $~lib/memory/__stack_pointer
  call $~lib/map/Map<~lib/string/String,~lib/string/String>#constructor
  local.tee $4
  i32.store offset=4
  i32.const 1
  local.set $0
  i32.const 1872
  local.set $5
  global.get $~lib/memory/__stack_pointer
  i32.const 1872
  i32.store offset=8
  i32.const 1
  local.set $2
  loop $for-loop|0
   local.get $2
   local.get $7
   i32.lt_u
   if
    local.get $3
    i32.const 20
    i32.sub
    i32.load offset=16
    i32.const 1
    i32.shr_u
    local.get $2
    i32.le_u
    if (result i32)
     i32.const -1
    else
     local.get $2
     i32.const 1
     i32.shl
     local.get $3
     i32.add
     i32.load16_u
    end
    local.tee $10
    i32.const 34
    i32.eq
    if (result i32)
     local.get $2
     i32.const 1
     i32.sub
     local.tee $9
     local.get $3
     i32.const 20
     i32.sub
     i32.load offset=16
     i32.const 1
     i32.shr_u
     i32.ge_u
     if (result i32)
      i32.const -1
     else
      local.get $9
      i32.const 1
      i32.shl
      local.get $3
      i32.add
      i32.load16_u
     end
     i32.const 92
     i32.ne
    else
     i32.const 0
    end
    if
     local.get $8
     i32.eqz
     local.set $8
    else
     local.get $8
     i32.eqz
     if
      local.get $6
      i32.const 1
      i32.add
      local.get $6
      local.get $10
      i32.const 93
      i32.eq
      local.get $10
      i32.const 125
      i32.eq
      i32.or
      select
      local.set $6
      local.get $1
      i32.const 1
      i32.add
      local.get $1
      local.get $10
      i32.const 91
      i32.eq
      local.get $10
      i32.const 123
      i32.eq
      i32.or
      select
      local.set $1
     end
    end
    local.get $1
    local.get $6
    i32.eq
    i32.const 0
    local.get $1
    select
    if
     local.get $3
     local.get $0
     i32.const 1
     i32.add
     local.get $2
     i32.const 1
     i32.add
     local.tee $0
     call $~lib/string/String#slice
     local.set $1
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=16
     local.get $1
     call $~lib/string/String#trim
     local.set $1
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=12
     local.get $4
     local.get $5
     local.get $1
     call $~lib/map/Map<~lib/string/String,~lib/string/String>#set
     i32.const 0
     local.set $6
     i32.const 0
     local.set $1
    end
    local.get $1
    i32.eqz
    if
     local.get $10
     i32.const 58
     i32.eq
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $3
      local.get $0
      i32.const 1
      i32.add
      local.get $2
      i32.const 1
      i32.sub
      call $~lib/string/String#slice
      local.set $0
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=20
      local.get $0
      call $~lib/string/String#trim
      local.tee $5
      i32.store offset=8
      local.get $2
     else
      local.get $10
      i32.const 44
      i32.eq
      if (result i32)
       local.get $0
       local.get $2
       i32.ne
       if
        local.get $3
        local.get $0
        i32.const 1
        i32.add
        local.get $2
        call $~lib/string/String#slice
        local.set $0
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=16
        local.get $0
        call $~lib/string/String#trim
        local.set $0
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=12
        local.get $4
        local.get $5
        local.get $0
        call $~lib/map/Map<~lib/string/String,~lib/string/String>#set
       end
       local.get $2
       i32.const 1
       i32.add
      else
       local.get $0
      end
     end
     local.set $0
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  local.get $0
  local.get $7
  i32.ne
  if
   local.get $3
   local.get $0
   i32.const 1
   i32.add
   local.get $7
   call $~lib/string/String#slice
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=16
   local.get $0
   call $~lib/string/String#trim
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=12
   local.get $4
   local.get $5
   local.get $0
   call $~lib/map/Map<~lib/string/String,~lib/string/String>#set
  end
  local.get $4
  call $assembly/token/AllowArgs#__decode
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/token/_allowKey (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i64.const 0
  i64.store
  local.get $2
  i32.const 4960
  i32.store offset=4
  i32.const 4960
  local.get $0
  call $~lib/string/String.__concat
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  local.get $1
  call $~lib/string/String.__concat
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/token/_setAllowance (param $0 i32) (param $1 i32) (param $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  local.get $0
  local.get $1
  call $assembly/token/_allowKey
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $2
  call $~lib/number/U32#toString
  local.set $1
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.store offset=4
  local.get $0
  local.get $1
  call $~lib/massa-sc-std/index/assembly_script_set_data
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/json-as/index/parseObject<assembly/token/AllowanceArgs> (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i64.const 0
  i64.store
  local.get $2
  i64.const 0
  i64.store offset=8
  local.get $2
  i64.const 0
  i64.store offset=16
  local.get $2
  local.get $0
  call $~lib/json-as/index/removeJSONWhitespace
  local.tee $3
  i32.store
  local.get $3
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  i32.const 1
  i32.sub
  local.set $7
  global.get $~lib/memory/__stack_pointer
  call $~lib/map/Map<~lib/string/String,~lib/string/String>#constructor
  local.tee $4
  i32.store offset=4
  i32.const 1
  local.set $0
  i32.const 1872
  local.set $5
  global.get $~lib/memory/__stack_pointer
  i32.const 1872
  i32.store offset=8
  i32.const 1
  local.set $2
  loop $for-loop|0
   local.get $2
   local.get $7
   i32.lt_u
   if
    local.get $3
    i32.const 20
    i32.sub
    i32.load offset=16
    i32.const 1
    i32.shr_u
    local.get $2
    i32.le_u
    if (result i32)
     i32.const -1
    else
     local.get $2
     i32.const 1
     i32.shl
     local.get $3
     i32.add
     i32.load16_u
    end
    local.tee $10
    i32.const 34
    i32.eq
    if (result i32)
     local.get $2
     i32.const 1
     i32.sub
     local.tee $9
     local.get $3
     i32.const 20
     i32.sub
     i32.load offset=16
     i32.const 1
     i32.shr_u
     i32.ge_u
     if (result i32)
      i32.const -1
     else
      local.get $9
      i32.const 1
      i32.shl
      local.get $3
      i32.add
      i32.load16_u
     end
     i32.const 92
     i32.ne
    else
     i32.const 0
    end
    if
     local.get $8
     i32.eqz
     local.set $8
    else
     local.get $8
     i32.eqz
     if
      local.get $6
      i32.const 1
      i32.add
      local.get $6
      local.get $10
      i32.const 93
      i32.eq
      local.get $10
      i32.const 125
      i32.eq
      i32.or
      select
      local.set $6
      local.get $1
      i32.const 1
      i32.add
      local.get $1
      local.get $10
      i32.const 91
      i32.eq
      local.get $10
      i32.const 123
      i32.eq
      i32.or
      select
      local.set $1
     end
    end
    local.get $1
    local.get $6
    i32.eq
    i32.const 0
    local.get $1
    select
    if
     local.get $3
     local.get $0
     i32.const 1
     i32.add
     local.get $2
     i32.const 1
     i32.add
     local.tee $0
     call $~lib/string/String#slice
     local.set $1
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=16
     local.get $1
     call $~lib/string/String#trim
     local.set $1
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=12
     local.get $4
     local.get $5
     local.get $1
     call $~lib/map/Map<~lib/string/String,~lib/string/String>#set
     i32.const 0
     local.set $6
     i32.const 0
     local.set $1
    end
    local.get $1
    i32.eqz
    if
     local.get $10
     i32.const 58
     i32.eq
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $3
      local.get $0
      i32.const 1
      i32.add
      local.get $2
      i32.const 1
      i32.sub
      call $~lib/string/String#slice
      local.set $0
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=20
      local.get $0
      call $~lib/string/String#trim
      local.tee $5
      i32.store offset=8
      local.get $2
     else
      local.get $10
      i32.const 44
      i32.eq
      if (result i32)
       local.get $0
       local.get $2
       i32.ne
       if
        local.get $3
        local.get $0
        i32.const 1
        i32.add
        local.get $2
        call $~lib/string/String#slice
        local.set $0
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=16
        local.get $0
        call $~lib/string/String#trim
        local.set $0
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=12
        local.get $4
        local.get $5
        local.get $0
        call $~lib/map/Map<~lib/string/String,~lib/string/String>#set
       end
       local.get $2
       i32.const 1
       i32.add
      else
       local.get $0
      end
     end
     local.set $0
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  local.get $0
  local.get $7
  i32.ne
  if
   local.get $3
   local.get $0
   i32.const 1
   i32.add
   local.get $7
   call $~lib/string/String#slice
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=16
   local.get $0
   call $~lib/string/String#trim
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=12
   local.get $4
   local.get $5
   local.get $0
   call $~lib/map/Map<~lib/string/String,~lib/string/String>#set
  end
  local.get $4
  call $assembly/token/AllowanceArgs#__decode
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $assembly/token/_getAllowance (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  local.get $0
  local.get $1
  call $assembly/token/_allowKey
  local.set $0
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 2336
  i32.store offset=4
  block $__inlined_func$~lib/massa-sc-std/index/Storage.get_data_or_default (result i32)
   local.get $0
   call $~lib/massa-sc-std/index/assembly_script_has_data
   if
    local.get $0
    call $~lib/massa-sc-std/index/assembly_script_get_data
    br $__inlined_func$~lib/massa-sc-std/index/Storage.get_data_or_default
   end
   i32.const 2336
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/json-as/index/parseObject<assembly/token/TransferFromArgs> (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i64.const 0
  i64.store
  local.get $2
  i64.const 0
  i64.store offset=8
  local.get $2
  i64.const 0
  i64.store offset=16
  local.get $2
  local.get $0
  call $~lib/json-as/index/removeJSONWhitespace
  local.tee $3
  i32.store
  local.get $3
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  i32.const 1
  i32.sub
  local.set $7
  global.get $~lib/memory/__stack_pointer
  call $~lib/map/Map<~lib/string/String,~lib/string/String>#constructor
  local.tee $4
  i32.store offset=4
  i32.const 1
  local.set $0
  i32.const 1872
  local.set $5
  global.get $~lib/memory/__stack_pointer
  i32.const 1872
  i32.store offset=8
  i32.const 1
  local.set $2
  loop $for-loop|0
   local.get $2
   local.get $7
   i32.lt_u
   if
    local.get $3
    i32.const 20
    i32.sub
    i32.load offset=16
    i32.const 1
    i32.shr_u
    local.get $2
    i32.le_u
    if (result i32)
     i32.const -1
    else
     local.get $2
     i32.const 1
     i32.shl
     local.get $3
     i32.add
     i32.load16_u
    end
    local.tee $10
    i32.const 34
    i32.eq
    if (result i32)
     local.get $2
     i32.const 1
     i32.sub
     local.tee $9
     local.get $3
     i32.const 20
     i32.sub
     i32.load offset=16
     i32.const 1
     i32.shr_u
     i32.ge_u
     if (result i32)
      i32.const -1
     else
      local.get $9
      i32.const 1
      i32.shl
      local.get $3
      i32.add
      i32.load16_u
     end
     i32.const 92
     i32.ne
    else
     i32.const 0
    end
    if
     local.get $8
     i32.eqz
     local.set $8
    else
     local.get $8
     i32.eqz
     if
      local.get $6
      i32.const 1
      i32.add
      local.get $6
      local.get $10
      i32.const 93
      i32.eq
      local.get $10
      i32.const 125
      i32.eq
      i32.or
      select
      local.set $6
      local.get $1
      i32.const 1
      i32.add
      local.get $1
      local.get $10
      i32.const 91
      i32.eq
      local.get $10
      i32.const 123
      i32.eq
      i32.or
      select
      local.set $1
     end
    end
    local.get $1
    local.get $6
    i32.eq
    i32.const 0
    local.get $1
    select
    if
     local.get $3
     local.get $0
     i32.const 1
     i32.add
     local.get $2
     i32.const 1
     i32.add
     local.tee $0
     call $~lib/string/String#slice
     local.set $1
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=16
     local.get $1
     call $~lib/string/String#trim
     local.set $1
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=12
     local.get $4
     local.get $5
     local.get $1
     call $~lib/map/Map<~lib/string/String,~lib/string/String>#set
     i32.const 0
     local.set $6
     i32.const 0
     local.set $1
    end
    local.get $1
    i32.eqz
    if
     local.get $10
     i32.const 58
     i32.eq
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $3
      local.get $0
      i32.const 1
      i32.add
      local.get $2
      i32.const 1
      i32.sub
      call $~lib/string/String#slice
      local.set $0
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=20
      local.get $0
      call $~lib/string/String#trim
      local.tee $5
      i32.store offset=8
      local.get $2
     else
      local.get $10
      i32.const 44
      i32.eq
      if (result i32)
       local.get $0
       local.get $2
       i32.ne
       if
        local.get $3
        local.get $0
        i32.const 1
        i32.add
        local.get $2
        call $~lib/string/String#slice
        local.set $0
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=16
        local.get $0
        call $~lib/string/String#trim
        local.set $0
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=12
        local.get $4
        local.get $5
        local.get $0
        call $~lib/map/Map<~lib/string/String,~lib/string/String>#set
       end
       local.get $2
       i32.const 1
       i32.add
      else
       local.get $0
      end
     end
     local.set $0
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  local.get $0
  local.get $7
  i32.ne
  if
   local.get $3
   local.get $0
   i32.const 1
   i32.add
   local.get $7
   call $~lib/string/String#slice
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=16
   local.get $0
   call $~lib/string/String#trim
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=12
   local.get $4
   local.get $5
   local.get $0
   call $~lib/map/Map<~lib/string/String,~lib/string/String>#set
  end
  local.get $4
  call $assembly/token/TransferFromArgs#__decode
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/json-as/index/parseObject<assembly/token/MintArgs> (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  i64.const 0
  i64.store
  local.get $2
  i64.const 0
  i64.store offset=8
  local.get $2
  i64.const 0
  i64.store offset=16
  local.get $2
  local.get $0
  call $~lib/json-as/index/removeJSONWhitespace
  local.tee $3
  i32.store
  local.get $3
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  i32.const 1
  i32.sub
  local.set $7
  global.get $~lib/memory/__stack_pointer
  call $~lib/map/Map<~lib/string/String,~lib/string/String>#constructor
  local.tee $4
  i32.store offset=4
  i32.const 1
  local.set $0
  i32.const 1872
  local.set $5
  global.get $~lib/memory/__stack_pointer
  i32.const 1872
  i32.store offset=8
  i32.const 1
  local.set $2
  loop $for-loop|0
   local.get $2
   local.get $7
   i32.lt_u
   if
    local.get $3
    i32.const 20
    i32.sub
    i32.load offset=16
    i32.const 1
    i32.shr_u
    local.get $2
    i32.le_u
    if (result i32)
     i32.const -1
    else
     local.get $2
     i32.const 1
     i32.shl
     local.get $3
     i32.add
     i32.load16_u
    end
    local.tee $10
    i32.const 34
    i32.eq
    if (result i32)
     local.get $2
     i32.const 1
     i32.sub
     local.tee $9
     local.get $3
     i32.const 20
     i32.sub
     i32.load offset=16
     i32.const 1
     i32.shr_u
     i32.ge_u
     if (result i32)
      i32.const -1
     else
      local.get $9
      i32.const 1
      i32.shl
      local.get $3
      i32.add
      i32.load16_u
     end
     i32.const 92
     i32.ne
    else
     i32.const 0
    end
    if
     local.get $8
     i32.eqz
     local.set $8
    else
     local.get $8
     i32.eqz
     if
      local.get $6
      i32.const 1
      i32.add
      local.get $6
      local.get $10
      i32.const 93
      i32.eq
      local.get $10
      i32.const 125
      i32.eq
      i32.or
      select
      local.set $6
      local.get $1
      i32.const 1
      i32.add
      local.get $1
      local.get $10
      i32.const 91
      i32.eq
      local.get $10
      i32.const 123
      i32.eq
      i32.or
      select
      local.set $1
     end
    end
    local.get $1
    local.get $6
    i32.eq
    i32.const 0
    local.get $1
    select
    if
     local.get $3
     local.get $0
     i32.const 1
     i32.add
     local.get $2
     i32.const 1
     i32.add
     local.tee $0
     call $~lib/string/String#slice
     local.set $1
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=16
     local.get $1
     call $~lib/string/String#trim
     local.set $1
     global.get $~lib/memory/__stack_pointer
     local.get $1
     i32.store offset=12
     local.get $4
     local.get $5
     local.get $1
     call $~lib/map/Map<~lib/string/String,~lib/string/String>#set
     i32.const 0
     local.set $6
     i32.const 0
     local.set $1
    end
    local.get $1
    i32.eqz
    if
     local.get $10
     i32.const 58
     i32.eq
     if (result i32)
      global.get $~lib/memory/__stack_pointer
      local.get $3
      local.get $0
      i32.const 1
      i32.add
      local.get $2
      i32.const 1
      i32.sub
      call $~lib/string/String#slice
      local.set $0
      global.get $~lib/memory/__stack_pointer
      local.get $0
      i32.store offset=20
      local.get $0
      call $~lib/string/String#trim
      local.tee $5
      i32.store offset=8
      local.get $2
     else
      local.get $10
      i32.const 44
      i32.eq
      if (result i32)
       local.get $0
       local.get $2
       i32.ne
       if
        local.get $3
        local.get $0
        i32.const 1
        i32.add
        local.get $2
        call $~lib/string/String#slice
        local.set $0
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=16
        local.get $0
        call $~lib/string/String#trim
        local.set $0
        global.get $~lib/memory/__stack_pointer
        local.get $0
        i32.store offset=12
        local.get $4
        local.get $5
        local.get $0
        call $~lib/map/Map<~lib/string/String,~lib/string/String>#set
       end
       local.get $2
       i32.const 1
       i32.add
      else
       local.get $0
      end
     end
     local.set $0
    end
    local.get $2
    i32.const 1
    i32.add
    local.set $2
    br $for-loop|0
   end
  end
  local.get $0
  local.get $7
  i32.ne
  if
   local.get $3
   local.get $0
   i32.const 1
   i32.add
   local.get $7
   call $~lib/string/String#slice
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=16
   local.get $0
   call $~lib/string/String#trim
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=12
   local.get $4
   local.get $5
   local.get $0
   call $~lib/map/Map<~lib/string/String,~lib/string/String>#set
  end
  local.get $4
  call $assembly/token/MintArgs#__decode
  global.get $~lib/memory/__stack_pointer
  i32.const 24
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $~lib/json-as/unknown/unknown#constructor (result i32)
  (local $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 28
  i32.const 3
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  local.get $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  i32.const 1872
  i32.store offset=8
  local.get $0
  i32.const 1872
  i32.const 0
  call $byn-split-outlined-A$~lib/rt/itcms/__link
  local.get $0
  f64.const 0
  f64.store offset=16
  local.get $0
  f32.const 0
  f32.store offset=24
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/json-as/unknown/unknown.wrap<bool> (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  i32.const 0
  i32.store
  local.get $1
  call $~lib/json-as/unknown/unknown#constructor
  local.tee $1
  i32.store
  local.get $1
  local.get $0
  i32.eqz
  i32.eqz
  i32.store
  local.get $1
  i32.const 11
  i32.store offset=4
  local.get $1
  i32.const 1904
  i32.store offset=8
  local.get $1
  i32.const 1904
  i32.const 0
  call $byn-split-outlined-A$~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $1
 )
 (func $assembly/token/MintArgs#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.const 19
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store
  end
  local.get $0
  i32.const 1872
  i32.store
  local.get $0
  i32.const 1872
  i32.const 0
  call $byn-split-outlined-A$~lib/rt/itcms/__link
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  i32.const 1872
  i32.store offset=8
  local.get $0
  i32.const 1872
  i32.const 0
  call $byn-split-outlined-A$~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/string/String#replaceAll (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i64.const 0
  i64.store
  block $folding-inner2
   block $folding-inner1
    local.get $0
    i32.const 20
    i32.sub
    i32.load offset=16
    i32.const 1
    i32.shr_u
    local.tee $3
    local.get $1
    i32.const 20
    i32.sub
    i32.load offset=16
    i32.const 1
    i32.shr_u
    local.tee $8
    i32.le_u
    if
     local.get $3
     local.get $8
     i32.ge_u
     if
      local.get $2
      local.get $0
      local.get $1
      local.get $0
      call $~lib/string/String.__eq
      select
      local.set $0
     end
     br $folding-inner2
    end
    local.get $2
    i32.const 20
    i32.sub
    i32.load offset=16
    i32.const 1
    i32.shr_u
    local.set $4
    local.get $8
    i32.eqz
    if
     local.get $4
     i32.eqz
     br_if $folding-inner2
     global.get $~lib/memory/__stack_pointer
     local.get $4
     local.get $3
     i32.const 1
     i32.add
     i32.mul
     local.get $3
     i32.add
     i32.const 1
     i32.shl
     i32.const 1
     call $~lib/rt/itcms/__new
     local.tee $5
     i32.store
     local.get $5
     local.get $2
     local.get $4
     i32.const 1
     i32.shl
     call $~lib/memory/memory.copy
     local.get $4
     local.set $1
     loop $for-loop|0
      local.get $3
      local.get $11
      i32.gt_u
      if
       local.get $1
       i32.const 1
       i32.shl
       local.get $5
       i32.add
       local.get $11
       i32.const 1
       i32.shl
       local.get $0
       i32.add
       i32.load16_u
       i32.store16
       local.get $1
       i32.const 1
       i32.add
       local.tee $1
       i32.const 1
       i32.shl
       local.get $5
       i32.add
       local.get $2
       local.get $4
       i32.const 1
       i32.shl
       call $~lib/memory/memory.copy
       local.get $1
       local.get $4
       i32.add
       local.set $1
       local.get $11
       i32.const 1
       i32.add
       local.set $11
       br $for-loop|0
      end
     end
     br $folding-inner1
    end
    local.get $4
    local.get $8
    i32.eq
    if
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.const 1
     i32.shl
     local.tee $3
     i32.const 1
     call $~lib/rt/itcms/__new
     local.tee $5
     i32.store
     local.get $5
     local.get $0
     local.get $3
     call $~lib/memory/memory.copy
     loop $while-continue|1
      local.get $0
      local.get $1
      local.get $10
      call $~lib/string/String#indexOf
      local.tee $3
      i32.const -1
      i32.xor
      if
       local.get $3
       i32.const 1
       i32.shl
       local.get $5
       i32.add
       local.get $2
       local.get $4
       i32.const 1
       i32.shl
       call $~lib/memory/memory.copy
       local.get $3
       local.get $8
       i32.add
       local.set $10
       br $while-continue|1
      end
     end
     br $folding-inner1
    end
    local.get $3
    local.set $5
    loop $while-continue|2
     local.get $0
     local.get $1
     local.get $10
     call $~lib/string/String#indexOf
     local.tee $7
     i32.const -1
     i32.xor
     if
      local.get $11
      if (result i32)
       local.get $11
       i32.const 20
       i32.sub
       i32.load offset=16
       i32.const 1
       i32.shr_u
      else
       i32.const 0
      end
      i32.eqz
      if
       global.get $~lib/memory/__stack_pointer
       local.get $3
       i32.const 1
       i32.shl
       i32.const 1
       call $~lib/rt/itcms/__new
       local.tee $11
       i32.store offset=4
      end
      local.get $5
      local.get $4
      local.get $9
      local.get $7
      local.get $10
      i32.sub
      local.tee $6
      i32.add
      i32.add
      i32.lt_u
      if
       global.get $~lib/memory/__stack_pointer
       local.get $11
       local.get $5
       i32.const 1
       i32.shl
       local.tee $5
       i32.const 1
       i32.shl
       call $~lib/rt/itcms/__renew
       local.tee $11
       i32.store offset=4
      end
      local.get $9
      i32.const 1
      i32.shl
      local.get $11
      i32.add
      local.get $10
      i32.const 1
      i32.shl
      local.get $0
      i32.add
      local.get $6
      i32.const 1
      i32.shl
      call $~lib/memory/memory.copy
      local.get $6
      local.get $9
      i32.add
      local.tee $6
      i32.const 1
      i32.shl
      local.get $11
      i32.add
      local.get $2
      local.get $4
      i32.const 1
      i32.shl
      call $~lib/memory/memory.copy
      local.get $4
      local.get $6
      i32.add
      local.set $9
      local.get $7
      local.get $8
      i32.add
      local.set $10
      br $while-continue|2
     end
    end
    local.get $11
    if
     local.get $5
     local.get $9
     local.get $3
     local.get $10
     i32.sub
     local.tee $1
     i32.add
     i32.lt_u
     if
      global.get $~lib/memory/__stack_pointer
      local.get $11
      local.get $5
      i32.const 1
      i32.shl
      local.tee $5
      i32.const 1
      i32.shl
      call $~lib/rt/itcms/__renew
      local.tee $11
      i32.store offset=4
     end
     local.get $1
     if
      local.get $9
      i32.const 1
      i32.shl
      local.get $11
      i32.add
      local.get $10
      i32.const 1
      i32.shl
      local.get $0
      i32.add
      local.get $1
      i32.const 1
      i32.shl
      call $~lib/memory/memory.copy
     end
     local.get $5
     local.get $1
     local.get $9
     i32.add
     local.tee $0
     i32.gt_u
     if
      global.get $~lib/memory/__stack_pointer
      local.get $11
      local.get $0
      i32.const 1
      i32.shl
      call $~lib/rt/itcms/__renew
      local.tee $11
      i32.store offset=4
     end
     global.get $~lib/memory/__stack_pointer
     i32.const 8
     i32.add
     global.set $~lib/memory/__stack_pointer
     local.get $11
     return
    end
    br $folding-inner2
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 8
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $5
   return
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/string/String#slice (param $0 i32) (param $1 i32) (param $2 i32) (result i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  local.set $3
  local.get $1
  i32.const 0
  i32.lt_s
  if (result i32)
   local.get $1
   local.get $3
   i32.add
   local.tee $1
   i32.const 0
   local.get $1
   i32.const 0
   i32.gt_s
   select
  else
   local.get $1
   local.get $3
   local.get $1
   local.get $3
   i32.lt_s
   select
  end
  local.set $1
  local.get $2
  i32.const 0
  i32.lt_s
  if (result i32)
   local.get $2
   local.get $3
   i32.add
   local.tee $2
   i32.const 0
   local.get $2
   i32.const 0
   i32.gt_s
   select
  else
   local.get $2
   local.get $3
   local.get $2
   local.get $3
   i32.lt_s
   select
  end
  local.get $1
  i32.sub
  local.tee $2
  i32.const 0
  i32.le_s
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1872
   return
  end
  global.get $~lib/memory/__stack_pointer
  local.get $2
  i32.const 1
  i32.shl
  local.tee $2
  i32.const 1
  call $~lib/rt/itcms/__new
  local.tee $3
  i32.store
  local.get $3
  local.get $1
  i32.const 1
  i32.shl
  local.get $0
  i32.add
  local.get $2
  call $~lib/memory/memory.copy
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $3
 )
 (func $~lib/string/String#trim (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 20
  i32.sub
  i32.load offset=16
  i32.const 1
  i32.shr_u
  local.tee $3
  i32.const 1
  i32.shl
  local.set $1
  loop $while-continue|0
   local.get $1
   if (result i32)
    block $__inlined_func$~lib/util/string/isSpace (result i32)
     local.get $0
     local.get $1
     i32.add
     i32.const 2
     i32.sub
     i32.load16_u
     local.tee $4
     i32.const 5760
     i32.lt_u
     if
      local.get $4
      i32.const 128
      i32.or
      i32.const 160
      i32.eq
      local.get $4
      i32.const 9
      i32.sub
      i32.const 4
      i32.le_u
      i32.or
      br $__inlined_func$~lib/util/string/isSpace
     end
     i32.const 1
     local.get $4
     i32.const -8192
     i32.add
     i32.const 10
     i32.le_u
     br_if $__inlined_func$~lib/util/string/isSpace
     drop
     block $break|0
      block $case6|0
       local.get $4
       i32.const 5760
       i32.eq
       br_if $case6|0
       local.get $4
       i32.const 8232
       i32.eq
       br_if $case6|0
       local.get $4
       i32.const 8233
       i32.eq
       br_if $case6|0
       local.get $4
       i32.const 8239
       i32.eq
       br_if $case6|0
       local.get $4
       i32.const 8287
       i32.eq
       br_if $case6|0
       local.get $4
       i32.const 12288
       i32.eq
       br_if $case6|0
       local.get $4
       i32.const 65279
       i32.eq
       br_if $case6|0
       br $break|0
      end
      i32.const 1
      br $__inlined_func$~lib/util/string/isSpace
     end
     i32.const 0
    end
   else
    i32.const 0
   end
   if
    local.get $1
    i32.const 2
    i32.sub
    local.set $1
    br $while-continue|0
   end
  end
  loop $while-continue|1
   local.get $1
   local.get $2
   i32.gt_u
   if (result i32)
    block $__inlined_func$~lib/util/string/isSpace0 (result i32)
     local.get $0
     local.get $2
     i32.add
     i32.load16_u
     local.tee $4
     i32.const 5760
     i32.lt_u
     if
      local.get $4
      i32.const 128
      i32.or
      i32.const 160
      i32.eq
      local.get $4
      i32.const 9
      i32.sub
      i32.const 4
      i32.le_u
      i32.or
      br $__inlined_func$~lib/util/string/isSpace0
     end
     i32.const 1
     local.get $4
     i32.const -8192
     i32.add
     i32.const 10
     i32.le_u
     br_if $__inlined_func$~lib/util/string/isSpace0
     drop
     block $break|01
      block $case6|02
       local.get $4
       i32.const 5760
       i32.eq
       br_if $case6|02
       local.get $4
       i32.const 8232
       i32.eq
       br_if $case6|02
       local.get $4
       i32.const 8233
       i32.eq
       br_if $case6|02
       local.get $4
       i32.const 8239
       i32.eq
       br_if $case6|02
       local.get $4
       i32.const 8287
       i32.eq
       br_if $case6|02
       local.get $4
       i32.const 12288
       i32.eq
       br_if $case6|02
       local.get $4
       i32.const 65279
       i32.eq
       br_if $case6|02
       br $break|01
      end
      i32.const 1
      br $__inlined_func$~lib/util/string/isSpace0
     end
     i32.const 0
    end
   else
    i32.const 0
   end
   if
    local.get $2
    i32.const 2
    i32.add
    local.set $2
    local.get $1
    i32.const 2
    i32.sub
    local.set $1
    br $while-continue|1
   end
  end
  local.get $1
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   i32.const 1872
   return
  end
  i32.const 0
  local.get $3
  i32.const 1
  i32.shl
  local.get $1
  i32.eq
  local.get $2
  select
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   local.get $0
   return
  end
  global.get $~lib/memory/__stack_pointer
  local.get $1
  i32.const 1
  call $~lib/rt/itcms/__new
  local.tee $3
  i32.store
  local.get $3
  local.get $0
  local.get $2
  i32.add
  local.get $1
  call $~lib/memory/memory.copy
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $3
 )
 (func $assembly/token/AllowArgs#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.const 21
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store
  end
  local.get $0
  i32.const 1872
  i32.store
  local.get $0
  i32.const 1872
  i32.const 0
  call $byn-split-outlined-A$~lib/rt/itcms/__link
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  i32.const 1872
  i32.store offset=8
  local.get $0
  i32.const 1872
  i32.const 0
  call $byn-split-outlined-A$~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/token/AllowanceArgs#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.const 22
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store
  end
  local.get $0
  i32.const 1872
  i32.store
  local.get $0
  i32.const 1872
  i32.const 0
  call $byn-split-outlined-A$~lib/rt/itcms/__link
  local.get $0
  i32.const 1872
  i32.store offset=4
  local.get $0
  i32.const 1872
  i32.const 0
  call $byn-split-outlined-A$~lib/rt/itcms/__link
  local.get $0
  i32.const 1872
  i32.store offset=8
  local.get $0
  i32.const 1872
  i32.const 0
  call $byn-split-outlined-A$~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/token/TransferArgs#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.const 23
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store
  end
  local.get $0
  i32.const 1872
  i32.store
  local.get $0
  i32.const 1872
  i32.const 0
  call $byn-split-outlined-A$~lib/rt/itcms/__link
  local.get $0
  i32.const 0
  i32.store offset=4
  local.get $0
  i32.const 1872
  i32.store offset=8
  local.get $0
  i32.const 1872
  i32.const 0
  call $byn-split-outlined-A$~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $assembly/token/TransferFromArgs#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.eqz
  if
   global.get $~lib/memory/__stack_pointer
   i32.const 16
   i32.const 24
   call $~lib/rt/itcms/__new
   local.tee $0
   i32.store
  end
  local.get $0
  i32.const 1872
  i32.store
  local.get $0
  i32.const 1872
  i32.const 0
  call $byn-split-outlined-A$~lib/rt/itcms/__link
  local.get $0
  i32.const 1872
  i32.store offset=4
  local.get $0
  i32.const 1872
  i32.const 0
  call $byn-split-outlined-A$~lib/rt/itcms/__link
  local.get $0
  i32.const 0
  i32.store offset=8
  local.get $0
  i32.const 1872
  i32.store offset=12
  local.get $0
  i32.const 1872
  i32.const 0
  call $byn-split-outlined-A$~lib/rt/itcms/__link
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/arraybuffer/ArrayBuffer#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.const 1073741820
  i32.gt_u
  if
   i32.const 4416
   i32.const 4464
   i32.const 52
   i32.const 43
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.const 0
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/map/Map<~lib/string/String,~lib/string/String>#constructor (result i32)
  (local $0 i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $0
  i32.const 0
  i32.store
  local.get $0
  i32.const 24
  i32.const 20
  call $~lib/rt/itcms/__new
  local.tee $0
  i32.store
  local.get $0
  i32.const 16
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.tee $1
  i32.store
  local.get $1
  if
   local.get $0
   local.get $1
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  local.get $0
  i32.const 3
  i32.store offset=4
  local.get $0
  i32.const 48
  call $~lib/arraybuffer/ArrayBuffer#constructor
  local.tee $1
  i32.store offset=8
  local.get $1
  if
   local.get $0
   local.get $1
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  local.get $0
  i32.const 4
  i32.store offset=12
  local.get $0
  i32.const 0
  i32.store offset=16
  local.get $0
  i32.const 0
  i32.store offset=20
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $~lib/map/Map<~lib/string/String,~lib/string/String>#set (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  (local $4 i32)
  (local $5 i32)
  (local $6 i32)
  (local $7 i32)
  (local $8 i32)
  (local $9 i32)
  (local $10 i32)
  (local $11 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 5588
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 0
   i32.store
   local.get $0
   local.get $1
   local.get $1
   call $~lib/util/hash/HASH<~lib/string/String>
   local.tee $8
   call $~lib/map/Map<~lib/string/String,~lib/string/String>#find
   local.tee $3
   if
    local.get $3
    local.get $2
    i32.store offset=4
    local.get $2
    if
     local.get $0
     local.get $2
     i32.const 1
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
   else
    local.get $0
    i32.load offset=16
    local.get $0
    i32.load offset=12
    i32.eq
    if
     local.get $0
     i32.load offset=20
     local.get $0
     i32.load offset=12
     i32.const 3
     i32.mul
     i32.const 4
     i32.div_s
     i32.lt_s
     if (result i32)
      local.get $0
      i32.load offset=4
     else
      local.get $0
      i32.load offset=4
      i32.const 1
      i32.shl
      i32.const 1
      i32.or
     end
     local.set $7
     global.get $~lib/memory/__stack_pointer
     i32.const 12
     i32.sub
     global.set $~lib/memory/__stack_pointer
     global.get $~lib/memory/__stack_pointer
     i32.const 5588
     i32.lt_s
     br_if $folding-inner0
     global.get $~lib/memory/__stack_pointer
     local.tee $3
     i64.const 0
     i64.store
     local.get $3
     i32.const 0
     i32.store offset=8
     local.get $3
     local.get $7
     i32.const 1
     i32.add
     local.tee $3
     i32.const 2
     i32.shl
     call $~lib/arraybuffer/ArrayBuffer#constructor
     local.tee $5
     i32.store
     global.get $~lib/memory/__stack_pointer
     local.get $3
     i32.const 3
     i32.shl
     i32.const 3
     i32.div_s
     local.tee $9
     i32.const 12
     i32.mul
     call $~lib/arraybuffer/ArrayBuffer#constructor
     local.tee $4
     i32.store offset=4
     local.get $0
     i32.load offset=8
     local.tee $6
     local.get $0
     i32.load offset=16
     i32.const 12
     i32.mul
     i32.add
     local.set $10
     local.get $4
     local.set $3
     loop $while-continue|0
      local.get $6
      local.get $10
      i32.ne
      if
       local.get $6
       i32.load offset=8
       i32.const 1
       i32.and
       i32.eqz
       if
        global.get $~lib/memory/__stack_pointer
        local.get $6
        i32.load
        local.tee $11
        i32.store offset=8
        local.get $3
        local.get $11
        i32.store
        local.get $3
        local.get $6
        i32.load offset=4
        i32.store offset=4
        local.get $3
        local.get $11
        call $~lib/util/hash/HASH<~lib/string/String>
        local.get $7
        i32.and
        i32.const 2
        i32.shl
        local.get $5
        i32.add
        local.tee $11
        i32.load
        i32.store offset=8
        local.get $11
        local.get $3
        i32.store
        local.get $3
        i32.const 12
        i32.add
        local.set $3
       end
       local.get $6
       i32.const 12
       i32.add
       local.set $6
       br $while-continue|0
      end
     end
     local.get $0
     local.get $5
     i32.store
     local.get $0
     local.set $3
     local.get $5
     if
      local.get $3
      local.get $5
      i32.const 0
      call $byn-split-outlined-A$~lib/rt/itcms/__link
     end
     local.get $3
     local.get $7
     i32.store offset=4
     local.get $3
     local.get $4
     i32.store offset=8
     local.get $4
     if
      local.get $3
      local.get $4
      i32.const 0
      call $byn-split-outlined-A$~lib/rt/itcms/__link
     end
     local.get $3
     local.get $9
     i32.store offset=12
     local.get $3
     local.get $3
     i32.load offset=20
     i32.store offset=16
     global.get $~lib/memory/__stack_pointer
     i32.const 12
     i32.add
     global.set $~lib/memory/__stack_pointer
    end
    global.get $~lib/memory/__stack_pointer
    local.get $0
    i32.load offset=8
    local.tee $3
    i32.store
    local.get $0
    local.get $0
    i32.load offset=16
    local.tee $4
    i32.const 1
    i32.add
    i32.store offset=16
    local.get $4
    i32.const 12
    i32.mul
    local.get $3
    i32.add
    local.tee $3
    local.get $1
    i32.store
    local.get $1
    if
     local.get $0
     local.get $1
     i32.const 1
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    local.get $3
    local.get $2
    i32.store offset=4
    local.get $2
    if
     local.get $0
     local.get $2
     i32.const 1
     call $byn-split-outlined-A$~lib/rt/itcms/__link
    end
    local.get $0
    local.get $0
    i32.load offset=20
    i32.const 1
    i32.add
    i32.store offset=20
    local.get $3
    local.get $0
    i32.load
    local.get $0
    i32.load offset=4
    local.get $8
    i32.and
    i32.const 2
    i32.shl
    i32.add
    local.tee $0
    i32.load
    i32.store offset=8
    local.get $0
    local.get $3
    i32.store
   end
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 22000
  i32.const 22048
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $~lib/array/Array<~lib/string/String>#__get (param $0 i32) (param $1 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 0
  i32.store
  local.get $0
  i32.load offset=12
  local.get $1
  i32.le_u
  if
   i32.const 1664
   i32.const 4528
   i32.const 114
   i32.const 42
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 2
  i32.shl
  i32.add
  i32.load
  local.tee $0
  i32.store
  local.get $0
  i32.eqz
  if
   i32.const 4576
   i32.const 4528
   i32.const 118
   i32.const 40
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
  local.get $0
 )
 (func $export:assembly/token/MintArgs#get:address (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  local.get $0
  i32.store
  local.get $0
  i32.load
  local.get $1
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/MintArgs#set:address (param $0 i32) (param $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  local.get $0
  i32.store
  local.get $2
  local.get $1
  i32.store offset=4
  local.get $0
  local.get $1
  i32.store
  local.get $1
  if
   local.get $0
   local.get $1
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/MintArgs#get:amount (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  local.get $0
  i32.store
  local.get $0
  i32.load offset=4
  local.get $1
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/MintArgs#set:amount (param $0 i32) (param $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  local.get $0
  i32.store
  local.get $0
  local.get $1
  i32.store offset=4
  local.get $2
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/MintArgs#get:__encoded (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  local.get $0
  i32.store
  local.get $0
  i32.load offset=8
  local.get $1
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/MintArgs#set:__encoded (param $0 i32) (param $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  local.get $0
  i32.store
  local.get $2
  local.get $1
  i32.store offset=4
  local.get $0
  local.get $1
  i32.store offset=8
  local.get $1
  if
   local.get $0
   local.get $1
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/MintArgs#__encode (param $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/token/MintArgs#__encode
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/MintArgs#__decode (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  local.get $0
  i32.store
  local.get $2
  local.get $1
  i32.store offset=4
  local.get $1
  call $assembly/token/MintArgs#__decode
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/MintArgs#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/token/MintArgs#constructor
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/AllowArgs#__encode (param $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/token/AllowArgs#__encode
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/AllowArgs#__decode (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  local.get $0
  i32.store
  local.get $2
  local.get $1
  i32.store offset=4
  local.get $1
  call $assembly/token/AllowArgs#__decode
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/AllowArgs#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/token/AllowArgs#constructor
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/AllowanceArgs#set:spender (param $0 i32) (param $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  local.get $0
  i32.store
  local.get $2
  local.get $1
  i32.store offset=4
  local.get $0
  local.get $1
  i32.store offset=4
  local.get $1
  if
   local.get $0
   local.get $1
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/AllowanceArgs#__encode (param $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/token/AllowanceArgs#__encode
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/AllowanceArgs#__decode (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  local.get $0
  i32.store
  local.get $2
  local.get $1
  i32.store offset=4
  local.get $1
  call $assembly/token/AllowanceArgs#__decode
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/AllowanceArgs#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/token/AllowanceArgs#constructor
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/TransferArgs#__encode (param $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/token/TransferArgs#__encode
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/TransferArgs#__decode (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  local.get $0
  i32.store
  local.get $2
  local.get $1
  i32.store offset=4
  local.get $1
  call $assembly/token/TransferArgs#__decode
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/TransferArgs#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/token/TransferArgs#constructor
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/TransferFromArgs#set:amount (param $0 i32) (param $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  local.get $0
  i32.store
  local.get $0
  local.get $1
  i32.store offset=8
  local.get $2
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/TransferFromArgs#get:__encoded (param $0 i32) (result i32)
  (local $1 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $1
  local.get $0
  i32.store
  local.get $0
  i32.load offset=12
  local.get $1
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/TransferFromArgs#set:__encoded (param $0 i32) (param $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  local.get $0
  i32.store
  local.get $2
  local.get $1
  i32.store offset=4
  local.get $0
  local.get $1
  i32.store offset=12
  local.get $1
  if
   local.get $0
   local.get $1
   i32.const 0
   call $byn-split-outlined-A$~lib/rt/itcms/__link
  end
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/TransferFromArgs#__encode (param $0 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/token/TransferFromArgs#__encode
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/TransferFromArgs#__decode (param $0 i32) (param $1 i32) (result i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.tee $2
  local.get $0
  i32.store
  local.get $2
  local.get $1
  i32.store offset=4
  local.get $1
  call $assembly/token/TransferFromArgs#__decode
  global.get $~lib/memory/__stack_pointer
  i32.const 8
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/TransferFromArgs#constructor (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/token/TransferFromArgs#constructor
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/balanceOf (param $0 i32) (result i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  global.get $~lib/memory/__stack_pointer
  i32.const 5588
  i32.lt_s
  if
   i32.const 22000
   i32.const 22048
   i32.const 1
   i32.const 1
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/memory/__stack_pointer
  local.get $0
  i32.store
  local.get $0
  call $assembly/token/balanceOf
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.add
  global.set $~lib/memory/__stack_pointer
 )
 (func $export:assembly/token/transfer (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 5588
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.store
   local.get $1
   i32.const 52
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5588
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   i64.const 0
   i64.store
   local.get $1
   i64.const 0
   i64.store offset=8
   local.get $1
   i64.const 0
   i64.store offset=16
   local.get $1
   i64.const 0
   i64.store offset=24
   local.get $1
   i64.const 0
   i64.store offset=32
   local.get $1
   i64.const 0
   i64.store offset=40
   local.get $1
   i32.const 0
   i32.store offset=48
   local.get $0
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
   if
    local.get $0
    i32.load16_u
    drop
   end
   local.get $1
   local.get $0
   call $~lib/json-as/index/parseObject<assembly/token/TransferArgs>
   local.tee $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   call $~lib/massa-sc-std/index/assembly_script_get_call_stack
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=4
   local.get $2
   call $~lib/json-as/index/JSON.parse<~lib/array/Array<~lib/string/String>>
   local.tee $0
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.const 0
   call $~lib/array/Array<~lib/string/String>#__get
   local.tee $2
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   i32.const 4704
   i32.store offset=44
   local.get $1
   i32.load offset=4
   call $~lib/number/U32#toString
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=48
   i32.const 4704
   local.get $0
   call $~lib/string/String.__concat
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=36
   global.get $~lib/memory/__stack_pointer
   i32.const 4752
   i32.store offset=40
   local.get $0
   i32.const 4752
   call $~lib/string/String.__concat
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=32
   local.get $0
   local.get $2
   call $~lib/string/String.__concat
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=24
   global.get $~lib/memory/__stack_pointer
   i32.const 4800
   i32.store offset=28
   local.get $0
   i32.const 4800
   call $~lib/string/String.__concat
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.load
   local.tee $3
   i32.store offset=20
   local.get $0
   local.get $3
   call $~lib/string/String.__concat
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store offset=4
   local.get $0
   call $~lib/massa-sc-std/index/assembly_script_print
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.load
   local.tee $0
   i32.store offset=16
   local.get $2
   local.get $0
   local.get $1
   i32.load offset=4
   call $assembly/token/_transfer
   call $~lib/number/U32#toString
   global.get $~lib/memory/__stack_pointer
   i32.const 52
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 22000
  i32.const 22048
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/token/allow (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 5588
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.store
   local.get $1
   i32.const 20
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5588
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   i64.const 0
   i64.store
   local.get $1
   i64.const 0
   i64.store offset=8
   local.get $1
   i32.const 0
   i32.store offset=16
   local.get $0
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
   if
    local.get $0
    i32.load16_u
    drop
   end
   local.get $1
   local.get $0
   call $~lib/json-as/index/parseObject<assembly/token/AllowArgs>
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   call $~lib/massa-sc-std/index/assembly_script_get_call_stack
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=4
   local.get $2
   call $~lib/json-as/index/JSON.parse<~lib/array/Array<~lib/string/String>>
   local.tee $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.const 0
   call $~lib/array/Array<~lib/string/String>#__get
   local.tee $1
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $2
   i32.store offset=16
   local.get $1
   local.get $2
   local.get $0
   i32.load offset=4
   call $assembly/token/_setAllowance
   local.get $0
   i32.load offset=4
   call $~lib/number/U32#toString
   global.get $~lib/memory/__stack_pointer
   i32.const 20
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 22000
  i32.const 22048
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/token/allowance (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 5588
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.store
   local.get $1
   i32.const 12
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5588
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   i64.const 0
   i64.store
   local.get $1
   i32.const 0
   i32.store offset=8
   local.get $0
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
   if
    local.get $0
    i32.load16_u
    drop
   end
   local.get $1
   local.get $0
   call $~lib/json-as/index/parseObject<assembly/token/AllowanceArgs>
   local.tee $1
   i32.store
   global.get $~lib/memory/__stack_pointer
   local.tee $0
   local.get $1
   i32.load
   local.tee $2
   i32.store offset=4
   local.get $0
   local.get $1
   i32.load offset=4
   local.tee $0
   i32.store offset=8
   local.get $2
   local.get $0
   call $assembly/token/_getAllowance
   global.get $~lib/memory/__stack_pointer
   i32.const 12
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 22000
  i32.const 22048
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/token/transferFrom (param $0 i32)
  (local $1 i32)
  (local $2 i32)
  (local $3 i32)
  (local $4 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 5588
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.store
   local.get $1
   i32.const 20
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5588
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   i64.const 0
   i64.store
   local.get $1
   i64.const 0
   i64.store offset=8
   local.get $1
   i32.const 0
   i32.store offset=16
   call $~lib/massa-sc-std/index/assembly_script_get_call_stack
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store
   local.get $1
   local.get $2
   call $~lib/json-as/index/JSON.parse<~lib/array/Array<~lib/string/String>>
   local.tee $1
   i32.store offset=4
   global.get $~lib/memory/__stack_pointer
   local.get $1
   local.get $1
   i32.load offset=12
   i32.const 1
   i32.sub
   call $~lib/array/Array<~lib/string/String>#__get
   local.tee $1
   i32.store offset=8
   local.get $0
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
   if
    local.get $0
    i32.load16_u
    drop
   end
   global.get $~lib/memory/__stack_pointer
   local.get $0
   call $~lib/json-as/index/parseObject<assembly/token/TransferFromArgs>
   local.tee $2
   i32.store offset=12
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.load
   local.tee $0
   i32.store offset=16
   local.get $0
   local.get $1
   call $assembly/token/_getAllowance
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.store
   local.get $0
   call $~lib/util/string/strtol<i32>
   local.tee $0
   local.get $2
   i32.load offset=8
   i32.le_u
   if
    i32.const 4992
    i32.const 4896
    i32.const 101
    i32.const 5
    call $~lib/builtins/abort
    unreachable
   end
   global.get $~lib/memory/__stack_pointer
   local.tee $3
   local.get $2
   i32.load
   local.tee $4
   i32.store
   local.get $3
   local.get $2
   i32.load offset=4
   local.tee $3
   i32.store offset=16
   local.get $4
   local.get $3
   local.get $2
   i32.load offset=8
   call $assembly/token/_transfer
   drop
   local.get $0
   local.get $2
   i32.load offset=8
   i32.sub
   local.set $0
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.load
   local.tee $2
   i32.store
   local.get $2
   local.get $1
   local.get $0
   call $assembly/token/_setAllowance
   global.get $~lib/memory/__stack_pointer
   i32.const 20
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 22000
  i32.const 22048
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $export:assembly/token/mint (param $0 i32) (result i32)
  (local $1 i32)
  (local $2 i32)
  global.get $~lib/memory/__stack_pointer
  i32.const 4
  i32.sub
  global.set $~lib/memory/__stack_pointer
  block $folding-inner0
   global.get $~lib/memory/__stack_pointer
   i32.const 5588
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   local.get $0
   i32.store
   local.get $1
   i32.const 32
   i32.sub
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 5588
   i32.lt_s
   br_if $folding-inner0
   global.get $~lib/memory/__stack_pointer
   local.tee $1
   i64.const 0
   i64.store
   local.get $1
   i64.const 0
   i64.store offset=8
   local.get $1
   i64.const 0
   i64.store offset=16
   local.get $1
   i64.const 0
   i64.store offset=24
   local.get $0
   i32.const 20
   i32.sub
   i32.load offset=16
   i32.const 1
   i32.shr_u
   if
    local.get $0
    i32.load16_u
    drop
   end
   local.get $1
   local.get $0
   call $~lib/json-as/index/parseObject<assembly/token/MintArgs>
   local.tee $0
   i32.store
   global.get $~lib/memory/__stack_pointer
   i32.const 5056
   i32.store offset=24
   local.get $0
   i32.load offset=4
   call $~lib/number/U32#toString
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=28
   i32.const 5056
   local.get $1
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=16
   global.get $~lib/memory/__stack_pointer
   i32.const 5104
   i32.store offset=20
   local.get $1
   i32.const 5104
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $2
   i32.store offset=12
   local.get $1
   local.get $2
   call $~lib/string/String.__concat
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   call $~lib/massa-sc-std/index/assembly_script_print
   call $assembly/token/totalSupply
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   call $~lib/util/string/strtol<i32>
   local.set $1
   global.get $~lib/memory/__stack_pointer
   i32.const 5152
   i32.store offset=8
   local.get $1
   call $~lib/number/U32#toString
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=12
   i32.const 5152
   local.get $2
   call $~lib/string/String.__concat
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=4
   local.get $2
   call $~lib/massa-sc-std/index/assembly_script_print
   local.get $0
   i32.load offset=4
   local.get $1
   i32.add
   local.set $1
   global.get $~lib/memory/__stack_pointer
   i32.const 5216
   i32.store offset=8
   local.get $1
   call $~lib/number/U32#toString
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=12
   i32.const 5216
   local.get $2
   call $~lib/string/String.__concat
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=4
   local.get $2
   call $~lib/massa-sc-std/index/assembly_script_print
   global.get $~lib/memory/__stack_pointer
   i32.const 4256
   i32.store offset=4
   local.get $1
   call $~lib/number/U32#toString
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   i32.const 4256
   local.get $1
   call $~lib/massa-sc-std/index/assembly_script_set_data
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $1
   i32.store offset=8
   local.get $1
   call $assembly/token/balanceOf
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=4
   local.get $1
   call $~lib/util/string/strtol<i32>
   local.get $0
   i32.load offset=4
   i32.add
   global.get $~lib/memory/__stack_pointer
   local.get $0
   i32.load
   local.tee $2
   i32.store offset=12
   local.get $2
   call $assembly/token/_balKey
   local.set $2
   global.get $~lib/memory/__stack_pointer
   local.get $2
   i32.store offset=4
   call $~lib/number/U32#toString
   local.set $1
   global.get $~lib/memory/__stack_pointer
   local.get $1
   i32.store offset=8
   local.get $2
   local.get $1
   call $~lib/massa-sc-std/index/assembly_script_set_data
   local.get $0
   i32.load offset=4
   call $~lib/number/U32#toString
   global.get $~lib/memory/__stack_pointer
   i32.const 32
   i32.add
   global.set $~lib/memory/__stack_pointer
   global.get $~lib/memory/__stack_pointer
   i32.const 4
   i32.add
   global.set $~lib/memory/__stack_pointer
   return
  end
  i32.const 22000
  i32.const 22048
  i32.const 1
  i32.const 1
  call $~lib/builtins/abort
  unreachable
 )
 (func $byn-split-outlined-A$~lib/rt/itcms/__visit (param $0 i32)
  global.get $~lib/rt/itcms/white
  local.get $0
  i32.const 20
  i32.sub
  local.tee $0
  i32.load offset=4
  i32.const 3
  i32.and
  i32.eq
  if
   local.get $0
   call $~lib/rt/itcms/Object#makeGray
   global.get $~lib/rt/itcms/visitCount
   i32.const 1
   i32.add
   global.set $~lib/rt/itcms/visitCount
  end
 )
 (func $byn-split-outlined-A$~lib/rt/itcms/__link (param $0 i32) (param $1 i32) (param $2 i32)
  (local $3 i32)
  local.get $0
  i32.eqz
  if
   i32.const 0
   i32.const 1536
   i32.const 294
   i32.const 14
   call $~lib/builtins/abort
   unreachable
  end
  global.get $~lib/rt/itcms/white
  local.get $1
  i32.const 20
  i32.sub
  local.tee $1
  i32.load offset=4
  i32.const 3
  i32.and
  i32.eq
  if
   local.get $0
   i32.const 20
   i32.sub
   local.tee $0
   i32.load offset=4
   i32.const 3
   i32.and
   local.tee $3
   global.get $~lib/rt/itcms/white
   i32.eqz
   i32.eq
   if
    local.get $0
    local.get $1
    local.get $2
    select
    call $~lib/rt/itcms/Object#makeGray
   else
    global.get $~lib/rt/itcms/state
    i32.const 1
    i32.eq
    local.get $3
    i32.const 3
    i32.eq
    i32.and
    if
     local.get $1
     call $~lib/rt/itcms/Object#makeGray
    end
   end
  end
 )
)
